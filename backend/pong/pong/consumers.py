import json
import time
import random
from asyncio import sleep
from channels.generic.websocket import AsyncWebsocketConsumer
from .utils.redis_helper import get_game_state, set_game_state
from .logic.game_logic import handle_local_input, handle_remote_input, game_logic


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'game_{self.room_name}'

        # Add this client to the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

        # Initialize game loop if both players are connected
        game = get_game_state(self.room_name)
        if "connections" not in game:
            game["connections"] = 0
        game["connections"] += 1
        set_game_state(self.room_name, game)

        if game["connections"] == 2:
            # Start the game loop when two players are connected
            await self.start_game_loop()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # Update game state to handle disconnections
        game = get_game_state(self.room_name)
        game["connections"] -= 1
        set_game_state(self.room_name, game)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")

        if action == "send_keypress":
            await self.handle_keypress(data)
        elif action == "get_game_state":
            await self.send_game_state(data)

    async def handle_keypress(self, data):
        room_name = data.get("room_name")
        keypress_p1 = data.get("keypress_p1")
        keypress_p2 = data.get("keypress_p2")
        player = data.get("player")

        game = get_game_state(room_name)

        if not game["paused"]:
            if not player:
                handle_local_input(game, keypress_p1, keypress_p2)
            else:
                handle_remote_input(game, keypress_p1, player)

        set_game_state(room_name, game)

    async def send_game_state(self, data):
        room_name = data.get("room_name")
        game = get_game_state(room_name)

        response = {
            "action": "game_state",
            "game_state": game,
        }

        await self.send(text_data=json.dumps(response))

    async def game_update(self, event):
        game_state = event["game_state"]

        await self.send(text_data=json.dumps({
            "action": "update_game_state",
            "game_state": game_state,
        }))

    async def start_game_loop(self):
        """
        Start a loop that runs at ~60 FPS to update and broadcast the game state.
        """
        while True:
            await sleep(1 / 60)

            # Retrieve game state
            game = get_game_state(self.room_name)

            # Check if game is over
            if game.get("finished"):
                break

            # Update game logic
            if not game["paused"]:
                game_logic(game)

            # Save updated game state
            set_game_state(self.room_name, game)

            # Broadcast updated game state to all players
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "game_update",
                    "game_state": game,
                }
            )
