import json, requests, threading, redis
import time
import random
from asyncio import sleep
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .utils.redis_helper import get_game_state, set_game_state
from .logic.game_logic import game_logic, move_right_paddle, move_left_paddle
from .utils.match_history import upload_match_details


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'game_{self.room_name}'

        self.token = self.get_jwt_from_headers(self.scope["headers"])
        if not self.token:
            print("No token found in headers")
            await self.close(code=4001)
            return

        try:
            user_data = await self.get_user_from_auth_service(self.token)
            self.user_id = user_data["user_id"]
            self.nickname = user_data["nickname"]
        except Exception as e:
            print(f"Error authenticating user: {e}")
            await self.close(code=4001)
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        game = get_game_state(self.room_name)
        if "connections" not in game:
            game["connections"] = 0
        game["connections"] += 1
        set_game_state(self.room_name, game)
        if game["connections"] == 2 or game["player2"] == "local" or game["player2"] == "AI":
            self.game_task = asyncio.create_task(self.start_game_loop())


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        game = get_game_state(self.room_name)
        game["connections"] -= 1
        if (game["connections"] == 0):
            game["endloop"] = True
        set_game_state(self.room_name, game)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            if isinstance(data, str):
                data = json.loads(data)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return

        t1 = data.get("type_p1", "")
        d1 = data.get("direction_p1", "")
        t2 = data.get("type_p2", "")
        d2 = data.get("direction_p2", "")

        game = get_game_state(self.room_name)

        if not game["paused"]:
            if t1 == "start_move":
                if self.nickname == game["player1"]:
                    game["p1_paddle"] = d1
                elif self.nickname == game["player2"]:
                    game["p2_paddle"] = d1
            elif t1 == "stop_move":
                if self.nickname == game["player1"]:
                    game["p1_paddle"] = ""
                elif self.nickname == game["player2"]:
                    game["p2_paddle"] = ""
            if game["game_type"] == "local":
                if t2 == "start_move":
                    game["p2_paddle"] = d2
                elif t2 == "stop_move":
                    game["p2_paddle"] = ""
            set_game_state(self.room_name, game)


    async def game_update(self, event):
        game_state = event["game_state"]

        await self.send(text_data=json.dumps({
            "room_name" : game_state["room_name"],
            "ball_x" : game_state["ball_x"],
            "ball_y" : game_state["ball_y"],
            "ball_speed_x" : game_state["ball_speed_x"],
            "ball_speed_y" : game_state["ball_speed_y"],
            "left_paddle_y" : game_state["left_paddle_y"],
            "right_paddle_y" : game_state["right_paddle_y"],
            "left_score" : game_state["left_score"],
            "right_score" : game_state["right_score"],
            "winner" : game_state["winner"],
            "game_start_timer" : game_state["game_start_timer"],
        }))

    async def start_game_loop(self):
        """
        Start a loop that runs at ~50 FPS to update and broadcast the game state.
        """
        while True:
            await sleep(1 / 50)
            game = get_game_state(self.room_name)

            if not game["paused"]:
                if game["p1_paddle"] == "up":
                    move_left_paddle(game, -1)
                if game["p1_paddle"] == "down":
                    move_left_paddle(game, 1)
                if game["p2_paddle"] == "up":
                    move_right_paddle(game, -1)
                if game["p2_paddle"] == "down":
                    move_right_paddle(game, 1)
                game_logic(game)
            else:
                if game["game_start_timer"] > 0:
                    time_diff = time.time() - game["creation_time"]
                    game["game_start_timer"] = int(max(0, 3 - time_diff))
                    game["paused"] = False

            set_game_state(self.room_name, game)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "game_update",
                    "game_state": game,
                }
            )
            if game.get("finished") or game.get("endloop"):
                self.game_stat_send(game)
                break


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
    
    
    def game_stat_send(self, game):
        opponent = game["player2"]
        score = f"{game["left_score"]}-{game["right_score"]}"
        result = "win" if game["winner"] == self.nickname else "loss"
        upload_match_details(self.user_id, opponent, result, score, self.token)
    