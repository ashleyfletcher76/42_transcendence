import json, requests, threading, redis
from channels.generic.websocket import AsyncWebsocketConsumer
from threading import Lock, Thread
from chat.redis_client import get_redis_client, should_stop, cleanup_redis
import signal, threading

user_channels = {}
channels_lock = Lock()
stop_signal = threading.Event()
should_stop = threading.Event()
_pubsub = None

class ChatConsumer(AsyncWebsocketConsumer):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.nickname = None

	async def connect(self):
		"""Handle WebSocket connection."""

		# extract JWT token from headers
		token = self.get_jwt_from_headers(self.scope["headers"])
		if not token:
			print("No token found in headers")
			await self.close(code=4001)
			return

		# authenticate user using auth service
		try:
			user_data = await self.get_user_from_auth_service(token)
			self.user_id = user_data["user_id"]
			self.nickname = user_data["nickname"]

		except Exception as e:
			print(f"Error authenticating user: {e}")
			await self.close(code=4001)
			return

		# add user to "chat_all" group
		await self.channel_layer.group_add("chat_all", self.channel_name)

		# register user in user_channels
		with channels_lock:
			if self.nickname not in user_channels:
				user_channels[self.nickname] = []
			user_channels[self.nickname].append(self)
			try:
				redis_client = get_redis_client()
				status_event = {
					"action": "online_status_update",
					"nickname": self.nickname,
					"online_status": True
				}
				redis_client.publish("chat_service_updates", json.dumps(status_event))
				print(f"[INFO] Published online status for {self.nickname}")
			except Exception as e:
				print(f"[ERROR] Failed to publish online status change to Redis: {e}")

		await self.accept()

	async def disconnect(self, close_code):
		"""Handle WebSocket disconnect."""
		if not self.nickname:
			print("[DEBUG] No nickname set for this consumer, skipping cleanup.")
			return

		# remove user from "chat_all" group
		await self.channel_layer.group_discard("chat_all", self.channel_name)

		# remove user's channel from user_channels
		with channels_lock:
			print(f"[DEBUG] Disconnecting {self.nickname} from channels.")
			if self.nickname in user_channels:
				user_channels[self.nickname].remove(self)
				if not user_channels[self.nickname]:
					del user_channels[self.nickname]
					print(f"[DEBUG] No channels left for {self.nickname}, publishing offline status.")
					try:
						redis_client = get_redis_client()
						status_event = {
							"action": "online_status_update",
							"nickname": self.nickname,
							"online_status": False
						}
						redis_client.publish("chat_service_updates", json.dumps(status_event))
						print(f"[INFO] Published offline status for {self.nickname}")
					except Exception as e:
						print(f"[ERROR] Failed to publish offline status to Redis: {e}")
				else:
					print(f"[DEBUG] Channels still exist for {self.nickname}, not publishing offline status.")
			else:
				print(f"[DEBUG] Nickname {self.nickname} not found in user_channels.")


	async def receive(self, text_data):
		try:
			# Parse incoming JSON data
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
				await self.send(text_data=json.dumps({"error": "Invalid message type."}))
		except json.JSONDecodeError as e:
			await self.send(text_data=json.dumps({"error": f"JSON decoding failed: {str(e)}"}))

	async def route_whisper(self, data):
		target_nickname = data.get("to")

		if not target_nickname:
			await self.send(text_data=json.dumps({"error": "Target nickname is required."}))
			return

		target_channels = user_channels.get(target_nickname)
		if target_channels:
			# send the message to the target user
			for consumer in target_channels:
				await self.channel_layer.send(
					consumer.channel_name,
					{"type": "chat_message", "data": data}
				)
			# echo the whisper back to the sender
			for consumer in user_channels.get(self.nickname, []):
				await self.channel_layer.send(
					consumer.channel_name,
					{"type": "chat_message", "data": data}
				)
		else:
			await self.send(text_data=json.dumps({"error": f"User {target_nickname} is not online."}))

	async def route_all(self, data):
		await self.channel_layer.group_send(
			"chat_all",
			{"type": "chat_message", "data": data}
		)

	async def chat_message(self, event):
		"""Handler for the `chat_message` event."""
		data = event["data"]
		await self.send(text_data=json.dumps(data))

	async def get_user_from_auth_service(self, token):
		if isinstance(token, bytes):
			token = token.decode("utf-8")

		try:
			response = requests.post(
				"http://auth-service:8000/auth/get-user-token/",
				json={"token": token}
			)
			if response.status_code == 200:
				return response.json()
			else:
				raise Exception("User authentication failed")
		except requests.RequestException as e:
			raise Exception(f"Auth-service unreachable: {str(e)}")

	def get_jwt_from_headers(self, headers):
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]
		return None

## REDIS LISTENER FOR UPDATING NICKNAME
def redis_listener():
	"""Listen for Redis events and update user_channels."""
	global _pubsub

	if should_stop.is_set():
		return

	try:
		redis_client = get_redis_client()
		_pubsub = redis_client.pubsub()
		_pubsub.subscribe("user_service_updates")
		print("[INFO] Redis listener started for chat-service.")

		while not should_stop.is_set():
			try:
				message = _pubsub.get_message(timeout=1.0)
				if message and message["type"] == "message":
					try:
						event_data = json.loads(message["data"])
						handle_user_service_event(event_data)
					except json.JSONDecodeError as e:
						print(f"[ERROR] Failed to decode Redis message: {e}")
			except redis.ConnectionError:
				if not should_stop.is_set():
					print("[ERROR] Redis connection error")
				break
			except ValueError:
				if not should_stop.is_set():
					print("[ERROR] Connection already closed")
				break
			except Exception as e:
				if not should_stop.is_set():
					print(f"[ERROR] Unexpected error in Redis listener: {e}")
				break

	except Exception as e:
		if not should_stop.is_set():
			print(f"[ERROR] Failed to initialize Redis connection: {e}")
	finally:
		if _pubsub:
			try:
				_pubsub.close()
			except Exception:
				pass
		print("[INFO] Redis listener stopped")

def handle_user_service_event(event_data):
	"""Handle events from user-service"""
	action = event_data.get("action")
	old_nickname = event_data.get("old_nickname")
	new_nickname = event_data.get("new_nickname")

	print(f"[DEBUG] Handling event: {event_data}")

	if action == "nickname_change" and old_nickname and new_nickname:
		with channels_lock:
			# print(f"[DEBUG] user_channels before update: {user_channels}")
			if old_nickname in user_channels:
				# Update nickname for all consumer instances
				consumers = user_channels.pop(old_nickname)
				user_channels[new_nickname] = consumers
				for consumer in consumers:
					consumer.nickname = new_nickname
				print(f"[INFO] Updated nickname in user_channels: {old_nickname} -> {new_nickname}")
			else:
				print(f"[WARNING] Old nickname {old_nickname} not found in user_channels.")
	else:
		print(f"[WARNING] Unhandled event: {event_data}")

## start the thread inside here to avoid circular imports##
listener_thread = Thread(target=redis_listener, daemon=True)
listener_thread.start()
print("[INFO] Redis listener thread started in chat-service.")

def handle_shutdown(signum, frame):
	"""Handle shutdown signals"""
	print("[INFO] Received shutdown signal, cleaning up...")
	cleanup_redis()

# register signal handlers
signal.signal(signal.SIGTERM, handle_shutdown)
signal.signal(signal.SIGINT, handle_shutdown)
