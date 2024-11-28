import json, requests, jwt
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

user_channels = {}

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		token = self.get_jwt_from_headers(self.scope["headers"])
		if not token:
			print("No token found in headers")
			await self.close(code=4001)
			return

		try:
			user_data = await self.get_user_from_auth_service(token)
			self.user_id = user_data["user_id"]
			self.username = user_data["username"]
		except requests.RequestException as e:
			print(f"Error connecting to auth-service: {e}")
			await self.close(code=4001)
			return

		await self.channel_layer.group_add("chat_lobby", self.channel_name)

		if self.username not in user_channels:
			user_channels[self.username] = []
		user_channels[self.username].append(self.channel_name)

		await self.accept()

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard("chat_lobby", self.channel_name)

		if self.username in user_channels:
			user_channels[self.username].remove(self.channel_name)
			if not user_channels[self.username]:
				del user_channels[self.username]

	async def receive(self, text_data):
		try:
			data = json.loads(text_data)
			message_type = data.get("type")

			if message_type == "whisper":
				await self.handle_whisper(data.get("target"), data.get("content"))
			elif message_type == "group":
				await self.handle_group_message(data.get("group_name"), data.get("content"))
			elif message_type == "lobby":
				await self.handle_lobby_message(data.get("content"))
			elif message_type == "add":
				await self.handle_add_friend(data.get("target"))
			elif message_type == "block":
				await self.handle_block_user(data.get("target"))
			else:
				await self.send(text_data=json.dumps({"error": "Invalid message type."}))
		except json.JSONDecodeError as e:
			await self.send(text_data=json.dumps({"error": f"JSON decoding failed: {str(e)}"}))

	async def handle_whisper(self, target_username, message):
		if not target_username:
			await self.send(text_data=json.dumps({"error": "Target username is required."}))
			return

		target_channel = user_channels.get(target_username)
		if target_channel:
			for channel in target_channel:
				await self.channel_layer.send(
					channel,
					{
						"type": "chat_message",
						"message": f"(Whisper from {self.username}): {message}",
					},
				)
		else:
			await self.send(text_data=json.dumps({"error": f"User {target_username} is not online."}))

	async def handle_group_message(self, group_name, message):
		if not group_name:
			await self.send(text_data=json.dumps({"error": "Group name is required."}))
			return

		group_room_name = f"chat_{group_name}"
		await self.channel_layer.group_send(
			group_room_name,
			{
				"type": "chat_message",
				"message": f"(Group {group_name}): {self.username}: {message}",
			},
		)

	async def handle_lobby_message(self, message):
		await self.channel_layer.group_send(
			"chat_lobby",
			{
				"type": "chat_message",
				"message": f"(Lobby): {self.username}: {message}",
			},
		)

	async def handle_add_friend(self, target_username):
		if not target_username:
			await self.send(text_data=json.dumps({"error": "Target username is required."}))
			return

		# check if user is online
		target_channel = user_channels.get(target_username)
		if target_channel:
			# notify the user about request
			for channel in target_channel:
				await self.channel_layer.send(
					channel,
					{
						"type": "chat_message",
						"message": f"{self.username} has sent you a friend request", 
					},
				)
		else:
			# target is not online
			await self.send(text_data=json.dumps({"error": f"User {target_username} is not online"}))

	async def handle_block_user(self, target_username):
		if not target_username:
			await self.send(text_data=json.dumps({"error": "Target username is required."}))
			return
		
		# notify the target user about being blocked
		target_channel = user_channels.get(target_username)
		if target_channel:
			for channel in target_channel:
				await self.channel_layer.send(
					channel,
					{
						"type": "chat_message",
						"message" : f"You have been blocked by {self.username}",
					},
				)


	async def chat_message(self, event):
		"""Handles incoming messages of type 'chat_message'."""
		message = event["message"]
		# send message to WebSocket
		await self.send(text_data=json.dumps({"message": message}))

	async def get_user_from_auth_service(self, token):
		if isinstance(token, bytes):
			token = token.decode("utf-8")

		try:
			response = requests.post(
				"http://auth-service:8000/auth/get-user-token/",
				json={"token": token}
			)
			print(f"Auth-service response status: {response.status_code}")
			print(f"Auth-service response body: {response.json()}")
			if response.status_code == 200:
				return response.json()
			else:
				raise Exception("User authentication failed")
		except requests.RequestException as e:
			print(f"Error connecting to auth-service: {e}")
			raise Exception(f"Auth-service unreachable: {str(e)}")

	def get_jwt_from_headers(self, headers):
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]
		return None
