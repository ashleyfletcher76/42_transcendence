import json
import requests
import signal, redis, threading
from datetime import datetime, timedelta
from threading import Lock
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.redis_client import get_redis_client, cleanup_redis, start_redis_listener

# constants
MAX_TOTAL_CONNECTIONS = 1000
MAX_CONNECTIONS_PER_USER = 2
MAX_MESSAGES_PER_MINUTE = 60

# global variables
user_channels = {}
channels_lock = Lock()
current_total_connections = 0
should_stop = threading.Event()

# start Redis listener
start_redis_listener(user_channels, channels_lock)


class ChatConsumer(AsyncWebsocketConsumer):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.nickname = None
		self.message_count = 0
		self.last_reset = datetime.now()

	async def connect(self):
		"""Handle WebSocket connection"""
		global current_total_connections

		if not await self.check_total_connections():
			return

		token = self.get_jwt_from_headers(self.scope["headers"])
		if not token or not await self.authenticate_user(token):
			await self.close(code=4001)
			return

		if not await self.check_user_connections():
			return

		await self.register_connection()
		await self.accept()

	async def disconnect(self, close_code):
		"""Handle WebSocket disconnect"""
		global current_total_connections

		if not self.nickname:
			return

		await self.unregister_connection()

	async def receive(self, text_data):
		"""Handle incoming messages"""
		if len(text_data) > 1024 * 10:
			await self.send_error("Message too large")
			return

		if not self.rate_limit():
			await self.send_error("Rate limit exceeded")
			return

		try:
			data = json.loads(text_data)
			message_type = data.get("type")

			if message_type == "whisper":
				await self.route_whisper(data)
			elif message_type == "all":
				await self.route_all(data)
			elif message_type == "add":
				await self.route_whisper(data)
			elif message_type == "invite":
				await self.route_whisper(data)
			else:
				await self.send_error("Invalid message type")
		except json.JSONDecodeError as e:
			await self.send_error(f"JSON decoding failed: {str(e)}")

	async def route_whisper(self, data):
		"""Route a whisper message to the target user"""
		target_nickname = data.get("to")
		if not target_nickname:
			await self.send_error("Target nickname is required")
			return

		target_channels = user_channels.get(target_nickname)
		if target_channels:
			await self.broadcast_to_channels(target_channels, data)
			await self.broadcast_to_channels(user_channels.get(self.nickname, []), data)
		else:
			await self.send_error(f"User {target_nickname} is not online")

	async def route_all(self, data):
		"""Broadcast a message to all users"""
		await self.channel_layer.group_send("chat_all", {"type": "chat_message", "data": data})

	async def chat_message(self, event):
		"""Handle a broadcasted chat message"""
		await self.send(text_data=json.dumps(event["data"]))

	async def register_connection(self):
		"""Register a new connection"""
		global current_total_connections

		print(f"[DEBUG] Attempting to register connection for nickname: {self.nickname}")

		await self.channel_layer.group_add("chat_all", self.channel_name)
		print(f"[DEBUG] Added to chat_all group: {self.channel_name}")
		with channels_lock:
			if self.nickname not in user_channels:
				print(f"[DEBUG] {self.nickname} not in user_channels. Initializing...")
				user_channels[self.nickname] = []
			user_channels[self.nickname].append(self)
			current_total_connections += 1
			print(f"[INFO] Current total connections: {current_total_connections}")
			print(f"[DEBUG] user_channels[{self.nickname}] after update: {user_channels[self.nickname]}")

		await self.update_online_status(True)
		print(f"[INFO] {self.nickname} is now online.")

	async def unregister_connection(self):
		"""Unregister a connection"""
		global current_total_connections

		await self.channel_layer.group_discard("chat_all", self.channel_name)
		with channels_lock:
			if self.nickname in user_channels:
				user_channels[self.nickname].remove(self)
				current_total_connections -= 1
				if not user_channels[self.nickname]:
					del user_channels[self.nickname]
					await self.update_online_status(False)
					print(f"[INFO] {self.nickname} is now offline.")
			else:
				print(f"[WARNING] {self.nickname} not found in user_channels.")

	async def update_online_status(self, is_online):
		"""Update the online status in Redis"""
		try:
			redis_client = get_redis_client()
			status_event = {
				"action": "online_status_update",
				"nickname": self.nickname,
				"online_status": is_online,
			}

			print(f"[DEBUG] Preparing to publish status event: {status_event}")

			redis_client.publish("chat_service_updates", json.dumps(status_event))

			if is_online is True:
				print(f"[INFO] Published online status for {self.nickname}")
			else:
				print(f"[INFO] Published offline status for {self.nickname}")
		except redis.ConnectionError as e:
			# Log connection error
			print(f"[ERROR] Redis connection error while updating online status: {e}")

		except Exception as e:
			print(f"[ERROR] Failed to update online status in Redis: {e}")

	def get_jwt_from_headers(self, headers):
		"""Extract JWT from headers"""
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]
		return None

	async def authenticate_user(self, token):
		"""Authenticate the user with the auth service"""
		try:
			response = requests.post(
				"http://auth-service:8000/auth/get-user-token/",
				json={"token": token},
			)
			if response.status_code == 200:
				user_data = response.json()
				self.user_id = user_data["user_id"]
				self.nickname = user_data["nickname"]
				return True
		except requests.RequestException as e:
			print(f"[ERROR] Authentication service error: {e}")
		return False

	async def check_total_connections(self):
		"""Check if the total connection limit is exceeded"""
		with channels_lock:
			if current_total_connections >= MAX_TOTAL_CONNECTIONS:
				await self.close(code=1013)
				return False
		return True

	async def check_user_connections(self):
		"""Check if the user connection limit is exceeded"""
		with channels_lock:
			if self.nickname in user_channels and len(user_channels[self.nickname]) >= MAX_CONNECTIONS_PER_USER:
				await self.close(code=1013)
				return False
		return True

	def rate_limit(self):
		"""Rate limit user messages"""
		now = datetime.now()
		if now - self.last_reset > timedelta(minutes=1):
			self.message_count = 0
			self.last_reset = now
		self.message_count += 1
		return self.message_count <= MAX_MESSAGES_PER_MINUTE

	async def send_error(self, error_message):
		"""Send an error message to the client"""
		await self.send(text_data=json.dumps({"error": error_message}))

	async def broadcast_to_channels(self, channels, data):
		"""Broadcast data to a list of channels"""
		for consumer in channels:
			await self.channel_layer.send(
				consumer.channel_name, {"type": "chat_message", "data": data}
			)

from chat.redis_client import cleanup_redis

# signal handlers
def handle_shutdown(signum, frame):
	print("[INFO] Shutdown signal received, cleaning up...")
	cleanup_redis()
	should_stop.set()


signal.signal(signal.SIGTERM, handle_shutdown)
signal.signal(signal.SIGINT, handle_shutdown)
