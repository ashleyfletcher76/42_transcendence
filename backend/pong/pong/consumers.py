import json, requests, threading, redis
import httpx
import time
import random
from asyncio import sleep
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .utils.redis_helper import get_game_state, set_game_state, delete_game_state
from .logic.game_logic import game_logic, move_right_paddle, move_left_paddle
from .logic.ai import PongAI
from .utils.match_history import upload_match_details, end_game


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
        print(game)
        if game["started"]:
            print(f"Reconnentction for {self.nickname}")
            game["connections"] += 1
            if game["player1"] == self.nickname:
                game["p1_connected"] = True
            elif game["player2"] == self.nickname:
                game["p2_connected"] = True
            game["paused_d"] = False
        else:
            if game["player1"] == self.nickname:
                game["player1_token"] = self.token
                game["p1_connected"] = True
                game["player1_id"] = self.user_id
            elif game["player2"] == self.nickname:
                game["player2_token"] = self.token
                game["p2_connected"] = True
                game["player2_id"] = self.user_id
            if "connections" not in game:
                game["connections"] = 0
            game["connections"] += 1
            if game["connections"] == 2 or game["player2"] == "local" or game["player2"] == "AI":
                game["started"] = True
                self.game_task = asyncio.create_task(self.start_game_loop())
                if game["player2"] == "AI":
                    self.ai_task = asyncio.create_task(self.start_game_loop_ai())
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "start_game"
                    }
                )
        set_game_state(self.room_name, game)


    async def disconnect(self, close_code):
        if not hasattr(self, "disconnected") or not self.disconnected:
            self.disconnected = True
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            game = get_game_state(self.room_name)
            game["connections"] -= 1
            print(f"game connections = {game["connections"]} player = {self.nickname}")
            set_game_state(self.room_name, game)
            if game["started"] and game["connections"] > 0:
                print("handle_disconnect")
                await self.handle_disconnect()
            elif game["connections"] == 0:
                print("handle_end_game")
                await self.handle_end_game()

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            if isinstance(data, str):
                data = json.loads(data)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return
        action = data.get("action", "")
        t1 = data.get("type_p1", "")
        d1 = data.get("direction_p1", "")
        t2 = data.get("type_p2", "")
        d2 = data.get("direction_p2", "")

        game = get_game_state(self.room_name)
        if action == "pause":
            game["paused"] = not game["paused"]
            set_game_state(self.room_name, game)
            return

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
        try:
            game_state = event["game_state"]
            await self.send(text_data=json.dumps({
                "room_name" : game_state["room_name"],
                "player1" : game_state["player1"],
                "player2" : game_state["player2"],
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
        except RuntimeError as e:
            if "websocket.send" in str(e):
                print(f"Attempted to send on a closed WebSocket: {e}")
    

    async def start_game(self, event):
        try:
            async with httpx.AsyncClient() as client:
                url = "http://user-service:8000/users/tournament-active/"
                headers = {
                    "Authorization": f"Bearer {self.token}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "action_type": "start",
                    "game_name" : self.room_name
                }
                response = await client.post(url, headers=headers, json=payload)
            if response.status_code == 200:
                print(response.json)
                return response.json()
            elif response.status_code == 404:
                print(f"Endpoint not found: {response.url}")
                return {"error": "Endpoint not found"}
            else:
                print(f"Request failed with status {response.status_code}: {response.text}")
                return {"error": f"Request failed with status {response.status_code}"}
        except httpx.RequestError as e:
            print(f"HTTP request error: {str(e)}")
            return {"error": "HTTP request failed"}
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {"error": "An unexpected error occurred"}


    async def handle_disconnect(self):
        game = get_game_state(self.room_name)
        game["paused"] = True
        if game["player1"] == self.nickname:
            game["p1_connected"] = False
        if game["player2"] == self.nickname:
            game["p2_connected"] = False
        game["paused_d"] = True
        set_game_state(self.room_name, game)

        if hasattr(self, "disconnection_task") and not self.disconnection_task.done():
            self.disconnection_task.cancel()

        self.disconnection_task = asyncio.create_task(self._disconnection_handler())

    async def _disconnection_handler(self):
        await asyncio.sleep(20)
        game = get_game_state(self.room_name)
        if game["player1"] == self.nickname and not game["p1_connected"]:
            game["winner"] = game["player2"]
            game["finished"] = True
        if game["player2"] == self.nickname and not game["p2_connected"]:
            game["winner"] = game["player1"]
            game["finished"] = True
        set_game_state(self.room_name, game)

    async def handle_end_game(self):
        game = get_game_state(self.room_name)
        if game["game_type"] == "remote" and game["player2"] == "remote":
            delete_game_state(self.room_name)
            return
        winner = game["player1"] if game["left_score"] > game["right_score"] else game["player2"]
        if game["left_score"] == game["right_score"]:
            winner = random.choice([game["player1"], game["player2"]])
        game["winner"] = winner
        game["paused"] = True
        game["finished"] = True
        print(f"{game["finished"]} == game finished")
        set_game_state(self.room_name, game)

        

    async def start_game_loop(self):
        """
        Start a loop that runs at ~50 FPS to update and broadcast the game state.
        """
        timer = time.time()
        timer_flag = True
        while True:
            await sleep(1 / 50)
            game = get_game_state(self.room_name)

            if not game.get("paused") and not game.get("paused_d"):
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
                time_diff = time.time() - timer
                game["game_start_timer"] = int(max(0, 3 - time_diff))
                if game["game_start_timer"] <= 0 and timer_flag:
                    timer_flag = False
                    game["paused"] = False

            set_game_state(self.room_name, game)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "game_update",
                    "game_state": game,
                }
            )
            if game.get("finished"):
                if game["player1_token"] != "":
                    self.game_stat_send(game, game["player1"], game["player1_id"], game["player1_token"])
                    await end_game(game["player1_token"])
                if game["player2_token"] != "":
                    self.game_stat_send(game, game["player2"], game["player2_id"], game["player2_token"])
                    await end_game(game["player2_token"])
                break

    
    async def start_game_loop_ai(self):
        ai_player = PongAI()
        while True:
            await sleep(1)
            game = get_game_state(self.room_name)
            if not game.get("paused") and not game.get("paused_d"):
                game["predict_ai"], game["ai_mode"] = ai_player.decide_move(
                    ball_x=game["ball_x"],
                    ball_y=game["ball_y"],
                    ball_speed_x=game["ball_speed_x"],
                    ball_speed_y=game["ball_speed_y"],
                    left_score=game["left_score"]
                )
                set_game_state(self.room_name, game)
            if game.get("finished"):
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
            print(f"Auth-service unreachable: {str(e)}")

    def get_jwt_from_headers(self, headers):
        for header in headers:
            if header[0].decode("utf-8") == "authorization":
                return header[1].decode("utf-8").split("Bearer ")[-1]
        return None
    
    def game_stat_send(self, game, nickname, id, token):
        if game["game_type"] == "tournament":
            return
        opponent = game["player2"] if nickname == game["player1"] else game["player1"]
        if game["winner"] == nickname:
            result = "win"
            left_score = max(game["left_score"], game["right_score"])
            right_score = min(game["left_score"], game["right_score"])
        else:
            result = "loss"
            left_score = game["left_score"]
            right_score = game["right_score"]
        score = f"{left_score}-{right_score}"
        upload_match_details(nickname, id, opponent, result, score, token)