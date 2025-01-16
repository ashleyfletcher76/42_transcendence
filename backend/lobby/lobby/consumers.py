import httpx
import json, requests, threading, redis
from asyncio import sleep
import asyncio
import random
from channels.generic.websocket import AsyncWebsocketConsumer
from .utils.redis_helper import set_tournament_state, get_tournamnet_state, delete_tournament_state
from .utils.match_history import upload_match_details
import time


class TournamentConsumer(AsyncWebsocketConsumer):
    game_service_url = "http://pong-game:8000/pong"

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
        tournamnent = get_tournamnet_state(self.room_name)
        if not tournamnent:
            await self.init_tournament()
        else:
            tournament = get_tournamnet_state(self.room_name)
            if not tournament:
                print(f"Tournament {self.room_name} not found")
                return
            print(tournament["players"])
            for player in tournament["players"]:
                if player["name"] == self.nickname:
                    print(f"Player trying to reconnect to lobby {self.nickname}")
                    print(player)
                    if not player["connection"]:
                        player["connection"] = True
                        tournament["num_players"] += 1
                        set_tournament_state(self.room_name, tournament)
                    return

            if not tournament["ongoing"] or tournament["active"]:
                await self.join_tournament()
            else:
                self.close(code=4001)

    async def disconnect(self, close_code):
        print(f"---------------------------")
        print(f"disconnection for {self.nickname}")
        await self.handle_leave()
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")
        sender = data.get("sender")
        message = data.get("message")

        if action == "message":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "message",
                    "message": message,
                    "sender": sender,
                }
            )
        elif action == "start_tournament":
            tournament = get_tournamnet_state(self.room_name)
            admin = tournament["admin"]
            if admin != self.nickname or tournament["ongoing"] or tournament["num_players"] <= 1:
                print("Cannot start the tournament: Admin check failed or not enough players")
                return
            asyncio.create_task(self.start_tournament())
            if tournament and "players" in tournament:
                for player in tournament["players"]:
                    token = player.get("token")
                    if token:
                        asyncio.create_task(self.start_tournament_user_service(token=token, room_name=self.room_name))
                        # await self.start_tournament_user_service(token=token, room_name=self.room_name)
                        print("sending start tournamnnet info to the user servvvice")
            



    # init_tournamnet or joining functions
    async def init_tournament(self):
        player = {
            "name" : self.nickname,
            "opponent" : "",
            "room" : "",
            "score" : 1,
            "admin" : True,
            "connection" : True,
            "token" : self.token,
        }
        players = []
        players.append(player)
        matches = []
        tournament = {
            "name" : self.room_name,
            "admin" : self.nickname,
            "num_players" : 1,
            "max_players" : 10,
            "players" : players,
            "created_at" : time.time(),
            "matches" : matches,
            "active" : True,
            "ongoing" : False,
            "winner" : "",
        }
        set_tournament_state(self.room_name, tournament)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "create",
                "tournament": tournament,
                "player" : self.nickname,
            }
        )
    
    async def join_tournament(self):
        tournament = get_tournamnet_state(self.room_name)
        for player in tournament["players"]:
            if player["name"] == self.nickname:
                await self.close(code=4001)
                return

        player = {
            "name" : self.nickname,
            "opponent" : "",
            "room" : "",
            "score" : 1,
            "admin" : False,
            "connection" : True,
            "token" : self.token,
        }
        tournament["players"].append(player)
        tournament["num_players"] += 1
        set_tournament_state(self.room_name, tournament)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "join",
                "tournament": tournament,
                "player": self.nickname,
            }
        )

    async def handle_leave(self):
        tournament = get_tournamnet_state(self.room_name)
        if not tournament:
            print(f"Tournament {self.room_name} not found")
            return

        player_to_update = None
        for player in tournament["players"]:
            if player["name"] == self.nickname:
                player_to_update = player
                break

        if not player_to_update:
            print(f"Player {self.nickname} not found in tournament {self.room_name}")
            return

        if tournament["ongoing"]:
            player_to_update["connection"] = False
            tournament["num_players"] -= 1
        else:
            tournament["players"].remove(player_to_update)
            tournament["num_players"] -= 1

        if player_to_update.get("admin"):
            if tournament["players"]:
                tournament["players"][0]["admin"] = True
                tournament["admin"] = tournament["players"][0]["name"]
            else:
                tournament["active"] = False
                delete_tournament_state(self.room_name)
                return

        set_tournament_state(self.room_name, tournament)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "leave",
                "tournament": tournament,
                "player": self.nickname,
            }
        )
        



    # matchmaking functions
    async def start_tournament(self):

        await self.matchmaking()
        await sleep(3)
        await self.result_getter()
        tournament = get_tournamnet_state(self.room_name)
        players = tournament["players"]
        active_players = [player for player in players if player["score"] > 0]
        if len(active_players) == 1:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "tournament_winner",
                    "winner" : active_players[0]["name"],
                }
            )
            tournament = get_tournamnet_state(self.room_name)
            if tournament and "players" in tournament:
                for player in tournament["players"]:
                    token = player.get("token")
                    if token:
                        asyncio.create_task(self.end_tournament_user_sercive(token=token))
                        print("sending end tournament info to the user service")
            await sleep(1)
            self.reset_players()
            return
        await self.start_tournament()


    def reset_players(self):
        tournament = get_tournamnet_state(self.room_name)
        players = tournament["players"]
        
        active_players = []
        for pl in players:
            if pl["connection"]:
                pl["opponent"] = ""
                pl["room"] = ""
                pl["score"] = 1
                active_players.append(pl)
            else:
                print(f"Removing player {pl['name']} due to inactive connection.")
        
        tournament["players"] = active_players
        tournament["ongoing"] = False
        set_tournament_state(self.room_name, tournament)


    async def matchmaking(self):
        tournament = get_tournamnet_state(self.room_name)
        players = tournament["players"]
        active_players = [player for player in players if player["score"] > 0]
        random.shuffle(active_players)
        matches = []

        while len(active_players) >= 2:
            player1 = active_players.pop(0)
            player2 = active_players.pop(0)

            room_name = self.get_game_room(player1, player2)
            if room_name:
                player1["opponent"] = player2["name"]
                player1["room"] = room_name
                player2["opponent"] = player1["name"]
                player2["room"] = room_name
                match = {
                    "player1": player1["name"],
                    "player2": player2["name"],
                    "room_name": room_name,
                    "start_time": time.time()
                }
                matches.append(match)
            else:
                print(f"Failed to create game room for {player1['name']} and {player2['name']}")
            if len(active_players) == 1:
                player_with_bye = active_players.pop(0)
                player_with_bye["opponent"] = ""
                player_with_bye["room"] = ""

        tournament["ongoing"] = True
        tournament["players"] = players
        tournament["matches"] = matches
        set_tournament_state(self.room_name, tournament)
        await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "match",
                }
            )
        return matches



    async def result_getter(self):
        tournament = get_tournamnet_state(self.room_name)
        matches = tournament["matches"]

        while matches:
            for match in matches[:]:
                tournament = get_tournamnet_state(self.room_name)
                player1 = match["player1"]
                player2 = match["player2"]
                room_name = match["room_name"]

                finished, winner, game = self.get_game_info(player1, player2, room_name)

                if finished:
                    player_1 = next((p for p in tournament["players"] if p["name"] == player1), None)
                    player_2 = next((p for p in tournament["players"] if p["name"] == player2), None)
                    player_1["room"] = ""
                    player_2["room"] = ""
                    if player_1["name"] == winner:
                        player_1["score"] += 1
                        player_2["score"] = -1
                        winner_name = player_1["name"]
                        loser_name = player_2["name"]
                    else:
                        player_1["score"] = -1
                        player_2["score"] += 1
                        winner_name = player_2["name"]
                        loser_name = player_1["name"]
                    
                    matches.remove(match)
                    tournament["matches"] = matches
                    set_tournament_state(self.room_name, tournament)

                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "result",
                            "winner" : winner_name,
                            "loser" : loser_name,
                        }
                    )
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "game_stat",
                            "game_state": game,
                        }
                    )

            await sleep(1)









    # interactions with pong-game 
    def get_game_info(self, player1, player2, room):
        game_service_url = f"http://pong-game:8000/pong/pong/game_state/{room}"
        try:
            response = requests.get(game_service_url)

            if response.status_code == 200:
                response_data = response.json()
            if (
                response_data.get("room_name") == room and
                response_data.get("finished") is True and
                (response_data.get("player1") == player1 or response_data.get("player2") == player1) and
                (response_data.get("player1") == player2 or response_data.get("player2") == player2)
            ):
                return True, response_data.get("winner"), response_data
            else:
                return False, None, None
            
        except requests.exceptions.RequestException as e:
            print(f"Error calling game API: {e}")
            return False, None, None

    def get_game_room(self, player1, player2):
        data = {"player": player1["name"], "player_2": player2["name"], "gameType": "tournament"}
        game_service_url = "http://pong-game:8000/pong/pong/create-room"

        try:
            response = requests.post(game_service_url, json=data)
            if response.status_code == 201:
                response_data = response.json()
                room_name = response_data.get("room_name")
                print(f"Game room created: {room_name}")
                return room_name
        except requests.exceptions.RequestException as e:
            print(f"Error creating game room: {e}")

        return None
    

    # sending messages to gruop
    async def join(self, event):
        tournament = event["tournament"]
        player = event["player"]
        player_list = [player["name"] for player in tournament["players"]]
        print(player_list)
        await self.send(text_data=json.dumps({
            "type": "join",
            "players": player_list,
            "player": player,
            "admin": tournament["admin"],
            "message": f"{player} joined the lobby!"
        }))
    

    async def create(self, event):
        tournament = event["tournament"]
        player = event["player"]
        player_list = [player["name"] for player in tournament["players"]]
        await self.send(text_data=json.dumps({
            "type": "create",
            "players": player_list,
            "player": player,
            "admin": tournament["admin"],
            "message" : f"{player} created the lobby!"
        }))


    async def leave(self, event):
        tournament = event["tournament"]
        player = event["player"]
        player_list = [player["name"] for player in tournament["players"]]
        await self.send(text_data=json.dumps({
            "type": "leave",
            "players": player_list,
            "player": player,
            "admin": tournament["admin"],
            "message" : f"{player} left the lobby!"
        }))


    async def message(self, event):
        message = event["message"]
        sender = event["sender"]
        await self.send(text_data=json.dumps({
            "type": "message",
            "sender": sender,
            "message": message
        }))

    async def result(self, event):
        winner = event["winner"]
        loser = event["loser"]
        await self.send(text_data=json.dumps({
            "type": "result",
            "winner": winner,
            "loser": loser
        }))


    async def match(self, event):
        tournament = get_tournamnet_state(self.room_name)
        player = next((p for p in tournament["players"] if p["name"] == self.nickname), None)
        if player["score"] < 1 or not player["opponent"]:
            return
        player2 = player["opponent"]
        roomname = player["room"]
        await self.send(text_data=json.dumps({
            "type": "match",
            "player1" : player["name"],
            "player2" : player2,
            "room" : roomname,
        }))

    async def tournament_winner(self, event):
        winner = event["winner"]
        await self.send(text_data=json.dumps({
            "type": "tournament_winner",
            "winner": winner
        }))

    async def start_tournament_user_service(self, token, room_name):
        try:
            async with httpx.AsyncClient() as client:
                url = "http://user-service:8000/users/tournament-active/"
                headers = {
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "action_type": "start",
                    "tournament_name" : room_name
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
                self.close(10001)
                return {"error": f"Request failed with status {response.status_code}"}
        except httpx.RequestError as e:
            print(f"HTTP request error: {str(e)}")
            return {"error": "HTTP request failed"}
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {"error": "An unexpected error occurred"}

    async def end_tournament_user_sercive(self, token):
        try:
            print("end game info send")
            url = "http://user-service:8000/users/tournament-active/"
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
            payload = {
                "action_type": "end_tournament"
            }
            async with httpx.AsyncClient() as client:
                response = await client.post( url, headers=headers, json=payload )
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





    




    # extra services for authentication
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
    

    # game stats recording

    async def game_stat(self, event):
        game = event["game_state"]
        tournament = get_tournamnet_state(self.room_name)
        flag = False
        active_players = [player for player in tournament["players"] if player["score"] > 0]
        if len(active_players) == 1 and active_players[0]["name"] == self.nickname:
            flag = True
        player = next((p for p in tournament["players"] if p["name"] == self.nickname), None)
        self.game_stat_send(player, game, flag)
    
    def game_stat_send(self, player, game, flag):
        opponent = player["opponent"]
        if game["winner"] == self.nickname:
            result = "win"
            left_score = max(game["left_score"], game["right_score"])
            right_score = min(game["left_score"], game["right_score"])
        else:
            result = "loss"
            left_score = game["left_score"]
            right_score = game["right_score"]
        score = f"{left_score}-{right_score}"
        upload_match_details(self.user_id, opponent, result, score, flag, self.token)


