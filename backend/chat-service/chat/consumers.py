import json, requests, jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
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
			# retrieve user information from auth-service
			user_data = await self.get_user_from_auth_service(token)
			self.user_id = user_data["user_id"]
			self.username = user_data["username"]
		except requests.RequestException as e:
			print(f"Error connecting to auth-service: {e}")
			await self.close(code=4001)
			return


		# add user to specific room and global lobby
		await self.channel_layer.group_add("chat_lobby", self.channel_name)

		# map user to their channel for whispers
		if self.username in user_channels:
			user_channels[self.username] = []
		user_channels[self.username].append(self.channel_name)

		await self.accept()

	async def disconnect(self, close_code):
		# remove user from room and lobby
		await self.channel_layer.group_discard("chat_lobby", self.channel_name)

		# remove user from in-memory mapping
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
			await self.channel_layer.send(
				target_channel,
				{
					"type": "chat_message",
					"message": f"(Whisper from {self.username}): {message}",
				},
			)
		else:
			await self.send(text_data=json.dumps({"error":f"User {target_username} is not online."}))

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

	async def get_user_from_auth_service(self, token):
		"""Fetch user data from the auth-service using the token."""
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
		"""Extract JWT token from the WebSocket headers."""
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]
		return None

# class ChatConsumer(AsyncWebsocketConsumer):
# 	async def connect(self):
# 		token = self.get_jwt_from_headers(self.scope["headers"])
# 		if not token:
# 			await self.close(code=4001)
# 			return

# 		try:
# 			# retrieve user information from auth-service
# 			user_data = await self.get_user_from_auth_service(token)
# 			self.user_id = user_data["user_id"]
# 			self.username = user_data["username"]
# 		except Exception as e:
# 			print(f"JWT validation failed: {e}")
# 			await self.close(code=4001)  # User not authenticated
# 			return

# 		# self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
# 		# self.room_group_name = f"chat_{self.room_name}"

# 		# # API call to check if the user is allowed in the room (if required)
# 		# response = requests.get(
# 		#     f"http://chat-service:8000/chat/rooms/{self.room_name}/members",
# 		#     headers={"Authorization": f"Bearer {token}"}
# 		# )
# 		# if response.status_code != 200 or not response.json().get("is_allowed"):
# 		#     await self.close(code=4003)  # User not a member of the room
# 		#     return

# 		# add user to specific room and global lobby
# 		await self.channel_layer.group_add(self.room_group_name, self.channel_name)
# 		await self.channel_layer.group_add("chat_lobby", self.channel_name)

# 		# map user to their channel for whispers
# 		if self.username in user_channels:
# 			del user_channels[self.username]
# 		user_channels[self.username] = self.channel_name

# 		await self.accept()

# 	async def disconnect(self, close_code):
# 		# remove user from room and lobby
# 		await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
# 		await self.channel_layer.group_discard("chat_lobby", self.channel_name)

# 		# remove user from in-memory mapping
# 		if self.username in user_channels:
# 			del user_channels[self.username]

# 	async def receive(self, text_data):
# 		try:
# 			data = json.loads(text_data)
# 			message_type = data.get("type")

# 			if message_type == "create_room":
# 				await self.handle_create_room(data)
# 			elif message_type == "invite_user":
# 				await self.handle_invite_user(data)
# 			elif message_type == "whisper":
# 				await self.handle_whisper(data.get("target"), data.get("content"))
# 			elif message_type == "group":
# 				await self.handle_group_message(data.get("group_name"), data.get("content"))
# 			elif message_type == "lobby":
# 				await self.handle_lobby_message(data.get("content"))
# 			else:
# 				await self.send(text_data=json.dumps({"error": "Invalid message type."}))
# 		except json.JSONDecodeError as e:
# 			await self.send(text_data=json.dumps({"error": f"JSON decoding failed: {str(e)}"}))

# 	async def handle_create_room(self, data):
# 		try:
# 			response = requests.post(
# 				"http://chat-service:8000/chat/create-room/",
# 				json={"name": data["room_name"], "type": data["room_type"]},
# 				headers={"Authorization": f"Bearer {self.get_jwt_from_headers(self.scope['headers'])}"}
# 			)
# 			response.raise_for_status()
# 			room_data = response.json()
# 			await self.send(text_data=json.dumps({"type": "create_room_success", **room_data}))
# 		except requests.exceptions.RequestException as e:
# 			if e.response and e.response.status_code == 400:
# 				# extract error response
# 				error_data = e.response.json()
# 				if error_data.get("error") == "Room name already exists":
# 					await self.send(
# 					text_data=json.dumps(
# 						{
# 							"type": "create_room_already_exists",
# 							"room_id": error_data.get("room_id"),
# 							"name": error_data.get("name"),
# 							"room_type": error_data.get("room_type"),
# 						}
# 					)
# 				)
# 				else:
# 					await self.send(
# 						text_data=json.dumps(
# 							{"type": "create_room_error", "error": error_data.get("error", str(e))}
# 						)
# 					)
# 			else:
# 				await self.send(
# 					text_data=json.dumps(
# 						{"type": "create_room_error", "error": str(e)}
# 					)
# 				)

# 	async def get_user_from_auth_service(self, token):
# 		"""Fetch user data from the auth-service using the token."""
# 		if isinstance(token, bytes):
# 			token = token.decode("utf-8")

# 		try:
# 			response = requests.post(
# 				"http://auth-service:8000/auth/get-user-token/",
# 				json={"token": token}
# 			)
# 			print(f"Auth-service response status: {response.status_code}")
# 			print(f"Auth-service response body: {response.json()}")
# 			if response.status_code == 200:
# 				return response.json()
# 			else:
# 				raise Exception("User authentication failed")
# 		except requests.RequestException as e:
# 			raise Exception(f"Auth-service unreachable: {str(e)}")

# 	def get_jwt_from_headers(self, headers):
# 		"""Extract JWT token from the WebSocket headers."""
# 		for header in headers:
# 			if header[0].decode("utf-8") == "authorization":
# 				return header[1].decode("utf-8").split("Bearer ")[-1]
# 		return None
