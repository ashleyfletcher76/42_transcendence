import json
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

user_channels = {}

def validate_jwt(token):
	"""Validates a JWT token"""
	try:
		# decode token using key
		payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
		return payload
	except ExpiredSignatureError:
		raise Exception("Token has expired")
	except InvalidTokenError:
		raise Exception("Invalid token")

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		# authenticate user
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
		print(f"User {self.scope['user'].username} connecting to room: {self.room_name}")

		# add user to specific room and global lobby
		await self.channel_layer.group_add(self.room_group_name, self.channel_name)
		await self.channel_layer.group_add("chat_lobby", self.channel_name)

		#  map user to their channel for whispers
		user_channels[self.username] = self.channel_name

		await self.accept()

	async def disconnect(self, close_code):
		# remove user from room and lobby
		await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
		await self.channel_layer.group_discard("chat_lobby", self.channel_name)

		# remove user from in-memory mapping
		if self.username in user_channels:
			del user_channels[self.username]

	async def receive(self, text_data):
		try:
			# parse incoming data
			data = json.loads(text_data)
			message_type = data.get("type")
			target = data.get("target")
			content = data.get("content")

			if message_type == "whisper":
				await self.handle_whisper(target, content)
			elif message_type == "group":
				await self.handle_group_message(target, content)
			elif message_type == "lobby":
				await self.handle_lobby_message(content)
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
			# send message to target
			await self.channel_layer.send(
				target_channel,
				{
					"type": "chat_message",
					"message": f"(Whisper from {self.scope['user'].username}): {message}",
				},
			)
		else:
			# inform sender user is not online
			await self.send(
				text_data=json.dumps({"error":f"User {target_username} is not online."})
				)

	async def handle_group_message(self, group_name, message):
		if not group_name:
			await self.send(text_data=json.dumps({"error": "Group name is required."}))
			return

		group_room_name = f"chat_{group_name}"
		await self.channel_layer.group_send(
			group_room_name,
			{
				"type": "chat_message",
				"message": f"(Group {group_name}): {self.scope['user'].username}: {message}",
			},
		)

	async def handle_lobby_message(self, message):
		# assume chat lobby as global lobyy group
		await self.channel_layer.group_send(
			"chat_lobby",
			{
				"type": "chat_message",
				"message": f"(Lobby): {self.scope['user'].username}: {message}",
			},
		)

	async def chat_message(self, event):
		# relay the message to web socket
		message = event["message"]
		await self.send(text_data=json.dumps({"message": message}))

	def get_jwt_from_headers(self, headers):
		"""Extracts the JWT token from the WebSocket headers."""
		for header in headers:
			if header[0].decode("utf-8") == "authorization":
				return header[1].decode("utf-8").split("Bearer ")[-1]

# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("WebSocket connection initiated")
#         self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.room_group_name = f"chat_{self.room_name}"

#         print(f"Connecting to room: {self.room_name}")

#         # join room group
#         await self.channel_layer.group_add(self.room_group_name, self.channel_name)

#         await self.accept()

#     async def disconnect(self, close_code):
#         # leave room
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

#     # receive message from socket
#     async def receive(self, text_data):
#         try:
#             # attempt to decode the incoming message
#             text_data_json = json.loads(text_data)
#             message = text_data_json.get("message", None)

#             if message:
#                 # broadcast message to room group
#                 await self.channel_layer.group_send(
#                     self.room_group_name, {"type": "chat_message", "message": message}
#                 )
#             else:
#                 print("Invalid message format: No 'message' field.")
#         except json.JSONDecodeError as e:
#             print(f"JSON decoding failed: {str(e)}")

#     # receive message from room group
#     async def chat_message(self, event):
#         message = event["message"]

#         # send message to web socket
#         await self.send(text_data=json.dumps({"message": message}))
