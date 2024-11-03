import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("WebSocket connection initiated")
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        print(f"Connecting to room: {self.room_name}")

        # join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # leave room
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # receive message from socket
    async def receive(self, text_data):
        try:
            # attempt to decode the incoming message
            text_data_json = json.loads(text_data)
            message = text_data_json.get("message", None)

            if message:
                # broadcast message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message", "message": message}
                )
            else:
                print("Invalid message format: No 'message' field.")
        except json.JSONDecodeError as e:
            print(f"JSON decoding failed: {str(e)}")

    # receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # send message to web socket
        await self.send(text_data=json.dumps({"message": message}))
