import json, requests, jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

user_channels = {}

def validate_jwt(token):
	"""Validates a JWT token"""
	try:
		payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
		return payload
	except ExpiredSignatureError:
		raise Exception("Token has expired")
	except InvalidTokenError:
		raise Exception("Invalid token")

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		token = self.get_jwt_from_headers(self.scope["headers"])
		if not token:
			await self.close(code=4001, reason="Invalid JWT token or user not authenticated.")
			return

		try:
			user_payload = validate_jwt(token)
			self.user_id = user_payload["user_id"]
			self.username = user_payload["username"]
		except Exception as e:
			print(f"JWT validation failed: {e}")
			await self.close(code=4001, reason="Invalid JWT token or user not authenticated.")
			return

		self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
		self.room_group_name = f"chat_{self.room_name}"

		# API call to check if the user is allowed in the room
		response = requests.get(
			f"http://chat-service:8000/chat/rooms/{self.room_name}/members",
			headers={"Authorization": f"Bearer {token}"}
		)
		if response.status_code != 200 or not response.json().get("is_allowed"):
			await self.close(code=4003, reason="User is not a member of the room.")
			return

		# Add user to specific room and global lobby
		await self.channel_layer.group_add(self.room_group_name, self.channel_name)
		await self.channel_layer.group_add("chat_lobby", self.channel_name)

		# Map user to their channel for whispers
		if self.username in user_channels:
			del user_channels[self.username]
		user_channels[self.username] = self.channel_name

		await self.accept()


	async def disconnect(self, close_code):
		# Remove user from room and lobby
		await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
		await self.channel_layer.group_discard("chat_lobby", self.channel_name)

		# Remove user from in-memory mapping
		if self.username in user_channels:
			del user_channels[self.username]

	async def receive(self, text_data):
		try:
			data = json.loads(text_data)
			message_type = data.get("type")

			if message_type == "create_room":
				await self.handle_create_room(data)
			elif message_type == "invite_user":
				await self.handle_invite_user(data)
			elif message_type == "whisper":
				await self.handle_whisper(data.get("target"), data.get("content"))
			elif message_type == "group":
				await self.handle_group_message(data.get("group_name"), data.get("content"))
			elif message_type == "lobby":
				await self.handle_lobby_message(data.get("content"))
			else:
				await self.send(text_data=json.dumps({"error": "Invalid message type."}))
		except json.JSONDecodeError as e:
			await self.send(text_data=json.dumps({"error": f"JSON decoding failed: {str(e)}"}))

	async def handle_create_room(self, data):
		try:
			response = requests.post(
				"http://chat-service:8000/chat/create-room",
				json={"name": data["room_name"], "type": data["room_type"]},
				headers={"Authorization": f"Bearer {self.get_jwt_from_headers(self.scope['headers'])}"}
			)
			response.raise_for_status()
			room_data = response.json()
			await self.send(text_data=json.dumps({"type": "create_room_success", **room_data}))
		except requests.exceptions.RequestException as e:
			await self.send(text_data=json.dumps({"type": "create_room_error", "error": str(e)}))

	async def handle_invite_user(self, data):
		try:
			# Notify users in real-time
			for user in data["invited_users"]:
				if user in user_channels:
					await self.channel_layer.group_send(
						f"user_{user}",
						{
							"type": "chat.message",
						"message": f"You've been invited to join room {data['room_id']}",
						},
					)
				else:
					await self.send(text_data=json.dumps({"error": f"User {user} is not online."}))

			# Call backend API to persist the invitation
			response = requests.post(
			f"http://chat-service:8000/chat/invite-users/",
			json={
				"room_id": data["room_id"],
				"invited_users": data["invited_users"],
				},
				headers={"Authorization": f"Bearer {self.get_jwt_from_headers(self.scope['headers'])}"},
				)
			response.raise_for_status()

			await self.send(
				text_data=json.dumps({"type": "invite_users_success", "message": "Users invited successfully."})
			)
		except requests.exceptions.RequestException as e:
			await self.send(text_data=json.dumps({"type": "invite_users_error", "error": str(e)}))


	async def handle_whisper(self, target_username, message):
		if not target_username:
			await self.send(text_data=json.dumps({"error": "Target username is required."}))
			return

		target_channel = user_channels.get(target_username)
		if target_channel:
			await self.channel_layer.send(
				target_channel,
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

	async def chat_message(self, event):
		message = event["message"]
		await self.send(text_data=json.dumps({"message": message}))

	def get_jwt_from_headers(self, headers):
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]
