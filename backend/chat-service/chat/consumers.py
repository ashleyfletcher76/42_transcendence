import json, requests, asyncio, time
from channels.generic.websocket import AsyncWebsocketConsumer
from threading import Lock, Thread
from chat.redis_client import get_redis_client

user_channels = {}
channels_lock = Lock()

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		"""Handle WebSocket connection."""
		# initialize Redis client
		self.redis_client = get_redis_client()

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

			# mark user as online
			if self.redis_client:
				try:
					self.redis_client.publish(
						"online_status_updates",
						json.dumps({"nickname": self.nickname, "online": True}),
					)
				except Exception as e:
					print(f"Error publishing online status: {e}")
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

		print(f"[DEBUG] Disconnect triggered for user: {self.nickname}")

		# mark user as offline after delay
		await asyncio.sleep(10)
		print(f"[DEBUG] Disconnect delay elapsed for user: {self.nickname}")

		with channels_lock:
			is_still_connected = self.nickname in user_channels

		print(f"[DEBUG] Checking if user {self.nickname} is still connected: {is_still_connected}")

		if not is_still_connected and self.redis_client:
			try:
				print(f"[DEBUG] Publishing offline status for {self.nickname}")
				self.redis_client.publish(
					"online_status_updates",
					json.dumps({"nickname": self.nickname, "online": False}),
				)
				print(f"[DEBUG] Offline status published for {self.nickname}")
			except Exception as e:
				print(f"[ERROR] Error publishing offline status: {e}")


		with channels_lock:
			is_still_connected = self.nickname in user_channels

		if not is_still_connected and self.redis_client:
			try:
				self.redis_client.publish(
					"online_status_updates",
					json.dumps({"nickname": self.nickname, "online": False}),
				)
			except Exception as e:
				print(f"Error publishing offline status: {e}")

	def start_redis_listener(self):
		"""Start a thread to listen for Redis events."""
		def redis_listener():
			try:
				pubsub = self.redis_client.pubsub()
				pubsub.subscribe("nicknames_updates")

				for message in pubsub.listen():
					if message["type"] == "message":
						data = json.loads(message["data"])
						self.handle_nickname_update(data)
			except Exception as e:
				print(f"Redis listener error: {e}")

		listener_thread = Thread(target=redis_listener, daemon=True)
		listener_thread.start()

	def handle_nickname_update(self, data):
		"""Handle nickname updates from Redis."""
		old_nickname = data["old_nickname"]
		new_nickname = data["new_nickname"]

		with channels_lock:
			if old_nickname in user_channels:
				# move channels to new nickname
				user_channels[new_nickname] = user_channels.pop(old_nickname)

		if self.redis_client:
			try:
				self.redis_client.publish(
					"online_status_updates",
					json.dumps({"nickname": new_nickname, "online": True}),
				)
			except Exception as e:
				print(f"Error publishing online status for new nickname: {e}")

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

