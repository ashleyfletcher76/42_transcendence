import json, requests, threading, redis
from channels.generic.websocket import AsyncWebsocketConsumer
from threading import Lock, Thread
from chat.redis_client import get_redis_client

user_channels = {}
channels_lock = Lock()
stop_signal = threading.Event()

class ChatConsumer(AsyncWebsocketConsumer):
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
			user_channels[self.nickname].append(self.channel_name)

		await self.accept()

	async def disconnect(self, close_code):
		"""Handle WebSocket disconnect."""
		# remove user from "chat_all" group
		await self.channel_layer.group_discard("chat_all", self.channel_name)

		# remove user's channel from user_channels
		with channels_lock:
			if self.nickname in user_channels:
				user_channels[self.nickname].remove(self.channel_name)
				if not user_channels[self.nickname]:
					del user_channels[self.nickname]

	async def receive(self, text_data):
		try:
			# Parse incoming JSON data
			data = json.loads(text_data)
			message_type = data.get("type")

			if message_type == "whisper":
				await self.route_whisper(data)
			elif message_type == "tournament":
				await self.route_tournament(data)
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

		# print(f"Attempting to whisper to {target_nickname}. Current user_channels: {user_channels}")
		if not target_nickname:
			await self.send(text_data=json.dumps({"error": "Target nickname is required."}))
			return

		# print(f"Nickname: {target_nickname}")
		target_channels = user_channels.get(target_nickname)
		if target_channels:
			# Send the message to the target user
			for channel in target_channels:
				await self.channel_layer.send(
					channel,
					{"type": "chat_message", "data": data}
				)
			# Echo the whisper back to the sender
			for channel in user_channels.get(self.nickname, []):
				await self.channel_layer.send(
					channel,
					{"type": "chat_message", "data": data}
				)
		else:
			await self.send(text_data=json.dumps({"error": f"User {target_nickname} is not online."}))

	async def route_tournament(self, data):
		tournament_name = data.get("to")

		if not tournament_name:
			await self.send(text_data=json.dumps({"error": "Tournament group name is required."}))
			return

		group_name = f"chat_tournament_{tournament_name}"
		await self.channel_layer.group_send(
			group_name,
			{"type": "chat_message", "data": data}
		)

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
	try:
		redis_client = get_redis_client()
		pubsub = redis_client.pubsub()
		pubsub.subscribe("user_service_updates")
		print("[INFO] Redis listener started for chat-service.")
	except redis.ConnectionError as e:
		print(f"[ERROR] Failed to connect to Redis: {e}")
		return  # Exit the thread gracefully

	for message in pubsub.listen():
		print(f"[DEBUG] Received message: {message}")
		if stop_signal.is_set():
			print("[INFO] Redis listener stopping gracefully.")
			break
		if message["type"] == "message":
			try:
				event_data = json.loads(message["data"])
				print(f"[DEBUG] Event data: {event_data}")
				handle_user_service_event(event_data)
			except json.JSONDecodeError as e:
				print(f"[ERROR] Failed to decode Redis message: {e}. Message ignored.")


def handle_user_service_event(event_data):
	"""Handle events from user-service"""
	action = event_data.get("action")
	old_nickname = event_data.get("old_nickname")
	new_nickname = event_data.get("new_nickname")

	print(f"[DEBUG] Handling event: {event_data}")

	if action == "nickname_change" and old_nickname and new_nickname:
		with channels_lock:
			print(f"[DEBUG] user_channels before update: {user_channels}")
			if old_nickname in user_channels:
				# transfer from old to new
				user_channels[new_nickname] = user_channels.pop(old_nickname)
				print(f"[INFO] Updated nickname in user_channels: {old_nickname} -> {new_nickname}")
	else:
		print(f"[WARNING] Unhandled event: {event_data}")

## Start the thread inside here to avoid circular imports that could happen in apps.py ##
listener_thread = Thread(target=redis_listener, daemon=True)
listener_thread.start()
print("[INFO] Redis listener thread started in chat-service.")
