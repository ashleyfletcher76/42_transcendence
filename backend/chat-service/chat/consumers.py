import json, requests
from channels.generic.websocket import AsyncWebsocketConsumer

user_channels = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extract JWT token from headers
        token = self.get_jwt_from_headers(self.scope["headers"])
        if not token:
            print("No token found in headers")
            await self.close(code=4001)
            return

        # Authenticate the user using the auth service
        try:
            user_data = await self.get_user_from_auth_service(token)
            self.user_id = user_data["user_id"]
            self.username = user_data["username"]
        except Exception as e:
            print(f"Error authenticating user: {e}")
            await self.close(code=4001)
            return

        # Add the user to the "all" group (previously "lobby")
        await self.channel_layer.group_add("chat_all", self.channel_name)

        # Register the user in `user_channels`
        if self.username not in user_channels:
            user_channels[self.username] = []
        user_channels[self.username].append(self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Remove the user from the "all" group
        await self.channel_layer.group_discard("chat_all", self.channel_name)

        # Remove the user's channel from `user_channels`
        if self.username in user_channels:
            user_channels[self.username].remove(self.channel_name)
            if not user_channels[self.username]:
                del user_channels[self.username]

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
        target_username = data.get("to")

        if not target_username:
            await self.send(text_data=json.dumps({"error": "Target username is required."}))
            return

        target_channels = user_channels.get(target_username)
        if target_channels:
            for channel in target_channels:
                await self.channel_layer.send(
                    channel,
                    {"type": "chat_message", "data": data}
                )
			# Echo the whisper back to the sender
            for channel in user_channels.get(self.username, []):
                await self.channel_layer.send(
                    channel,
                    {"type": "chat_message", "data": data}
            )

        else:
            await self.send(text_data=json.dumps({"error": f"User {target_username} is not online."}))


    async def route_tournament(self, data):
        group_name = data.get("to")

        if not group_name:
            await self.send(text_data=json.dumps({"error": "Tournament group name is required."}))
            return

        group_room_name = f"chat_{group_name}"
        await self.channel_layer.group_send(
            group_room_name,
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
