import django
django.setup()

from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import ObjectDoesNotExist
import json
from .backend.lobby.lobby.models import Tournament, Player
from django.contrib.auth.models import User
from asgiref.sync import async_to_sync, sync_to_async
from django.db import transaction
from channels.db import database_sync_to_async
import random
import requests

class TournamentConsumer(AsyncWebsocketConsumer):

    game_service_url = "http://pong-game:8000/pong"

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"tournament_{self.room_name}"
        self.username = None
        self.joined = False

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print(f"disconnecting user : {self.username}, {close_code}")
        username = self.username
        if username:
            await self.remove_player_from_tournament(username)

        response = await self.handle_leave()
        await self.lobby_message(response)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await super().disconnect(close_code)


    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        action = data.get("action")
        username = data.get("nickname")
        sender = data.get("sender")
        message = data.get("message")
        winner = data.get("winner")

        if action == "create_or_join":
            self.username = username
            response = await self.handle_create_or_join()
            await self.lobby_message(response)
        elif action == "message":
            response = await self.handle_message(message=message, sender=sender)
            await self.lobby_message(response)
        elif action == "start_tournament":
            response = await self.start_tournament()
            await self.lobby_message(response)
        elif action == "winner":
            response = await self.get_winner(winner)
            if response:
                await self.lobby_message(response)


    """type funcitons"""
    async def message(self, event):
        if not self.joined:
            return
        message = event["message"]
        sender = event["sender"]
        await self.send(text_data=json.dumps({
            "type": "message",
            "sender": sender,
            "message": message
        }))

    async def error(self, event):
        if not self.joined:
            return
        error = event["error"]
        player = event["player"]
        if player == self.username:
            await self.send(text_data=json.dumps({
                "type": "error",
                "error": error,
                "player": player
            }))

    async def start(self, event):
        if not self.joined:
            return
        message = event["message"]
        await self.send(text_data=json.dumps({
            "type": "start",
            "message": message
        }))
        
    async def finished(self, event):
        await self.disconnect(1005)

    async def tournament_winner(self, event):
        if not self.joined:
            return
        winner = event["winner"]
        await self.lobby_message({
            "type" : "finished"
        })
        await self.send(text_data=json.dumps({
            "type": "tournament_winner",
            "winner": winner
        }))

    async def match(self, event):
        if not self.joined:
            return
        message = event["message"]
        try:
            tournament = await self.find_tournament()
        except Tournament.DoesNotExist:
            await self.send(text_data=json.dumps({
                "type": "error",
                "error": f"Tournament with name '{self.room_name}' not found.",
                "player" : self.username 
            }))
            return

        player = await self.find_player(tournament)

        if not player:
            await self.send(text_data=json.dumps({
                "type": "error",
                "error": "Player not found in the tournament.",
                "player" : self.username
            }))
            await self.disconnect(1005)
            return
        player1 = self.username
        player2 = player.opponent
        roomname = player.room
        print(roomname)
        await self.send(text_data=json.dumps({
            "type": "match",
            "player1" : player1,
            "player2" : player2,
            "room" : roomname,
            "message": message
        }))

    async def join(self, event):
        if not self.joined:
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        await self.send(text_data=json.dumps({
            "type": "join",
            "players": players,
            "player": player,
            "admin": admin,
            "message" : message
        }))

    async def create(self, event):
        if not self.joined:
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        await self.send(text_data=json.dumps({
            "type": "create",
            "players": players,
            "player": player,
            "admin" : admin,
            "message" : message
        }))

    async def leave(self, event):
        if not self.joined:
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        await self.send(text_data=json.dumps({
            "type": "leave",
            "players": players,
            "player": player,
            "admin" : admin,
            "message" : message
        }))

    async def handle_leave(self):
        try:
            tournament = await database_sync_to_async(Tournament.objects.get)(name=self.room_name)
            usernames, admin = await self.get_player_usernames(tournament)
            return {
                "type": "leave",
                "players": usernames,
                "player": self.username,
                "admin": admin,
                "message" : "User left the room."
            }
        
        except Exception as e:
            print(f"Error in handle_leave: {e}")
            return {
                "type": "error",
                "error" : "An error occurred while processing the leave request.",
            }


    #send message to all group
    async def lobby_message(self, response):
        await self.channel_layer.group_send(
            self.room_group_name,
            response
        )


    #handler for the action message
    async def handle_message(self, message, sender):
        return {
            "type" : "message",
            "sender" : sender,
            "message" : message
        }


    @sync_to_async
    def decide_match(self, tournament, winner):
        players = list(tournament.players.all())
        matches = tournament.matches

        match_to_remove = None
        loser = None

        for match in matches:
            if match["player1"] == winner or match["player2"] == winner:
                info_check = self.get_game_info(match["player1"], match["room"])
                if info_check:
                    match_to_remove = match
                    loser = match["player1"] if match["player2"] == winner else match["player2"]
                else:
                    break

        if match_to_remove:
            match_to_remove["winner"] = winner
            matches.remove(match_to_remove)
            tournament.matches = matches
            try:
                loser_instance = Player.objects.get(user__username=loser)
                tournament.players.remove(loser_instance)
            except Player.DoesNotExist:
                raise ValueError(f"Player with username '{loser}' does not exist.")
            tournament.save()
        players = list(tournament.players.all())
        print(f"number of players : {len(players)}")
        if len(players) == 1:
            final_winner = players[0].user.username
            tournament.winner = final_winner
            tournament.save()
            return {
                "type": "tournament_winner",
                "winner": final_winner
            }
        return {}

    async def get_winner(self, winner):
        tournament = await self.get_tournament()
        if not tournament:
            return {
                "type" : "error",
                "error" : "Tournament not found."
            }
        await database_sync_to_async(tournament.refresh_from_db)()

        response = await self.decide_match(tournament, winner)
        print(response)
        if response:
            return (response)
        tournament = await self.get_tournament()
        await database_sync_to_async(tournament.refresh_from_db)()
        if not tournament.matches:
            response = await self.start_tournament()
        return (response)


    async def start_tournament(self):
        tournament = await self.get_tournament()
        await database_sync_to_async(tournament.refresh_from_db)()
        players_count = await database_sync_to_async(lambda: tournament.players.count())()
        matches = await database_sync_to_async(lambda: tournament.matches)()
        matches_count = len(matches)
        print("match cound : ", matches_count)
        if (players_count <= 1 or matches_count != 0):
            return {
                "type" : "error",
                "error" : "Not enough players in the lobby or ongoing games.",
                "player" : self.username
            }

        players = await self.get_players(tournament)
        matches = await self.match_players(players)
        await self.assign_matches(tournament, matches)

        await self.lobby_message({
            "type" : "match",
            "message" : "Match created.",
            })

        return {
            "type": "start",
            "message": "Tournament Started",
            "matches" : matches
        }


    async def match_players(self, players):
        matches = []
        random.shuffle(players)

        for i in range(0, len(players), 2):
            player1 = players[i]
            player2 = players[i + 1] if i + 1 < len(players) else None
        
            player1_username = await self.get_player_username(player1)
            player2_username = await self.get_player_username(player2)
    
            if player2:
                room_name = await self.get_game_room(player1=player1, player2=player2)
                await self.assign_match(player1, player2, room_name)
                matches.append({
                    "player1": player1_username,
                    "player2": player2_username,
                    "room": room_name,
                    "winner" : ""
                })
        print(matches)
        return matches

    async def get_game_room(self, player1, player2):
        game_service_url = "http://pong-game:8000/pong/pong/create-room"


        player1_username = await self.get_player_username(player1)
        player2_username = await self.get_player_username(player2)

        data = {
            "player": player1_username,
            "player_2": player2_username,
            "gameType": "tournament"
        }

        try:
            response = requests.post(game_service_url, json=data)

            if response.status_code == 201:
                response_data = response.json()
                room_name = response_data.get("room_name")
                return room_name
            else:
                print("error in here!")
                return None

        except requests.exceptions.RequestException as e:
            print(f"Error calling game API: {e}")
            return None

    def get_game_info(self, player1, room):
        game_service_url = f"http://pong-game:8000/pong/pong/game_state/{room}"


        try:
            response = requests.get(game_service_url)

            if response.status_code == 200:
                response_data = response.json()
                #print(response_data)
            if (
                response_data.get("room_name") == room and
                response_data.get("finished") is True and
                (response_data.get("player1") == player1 or response_data.get("player2") == player1)
            ):
                return True
            else:
                print("Validation failed: room name, players, or 'finished' flag does not match.")
                return False
            

        except requests.exceptions.RequestException as e:
            print(f"Error calling game API: {e}")
            return False


    #handle for joining with database changes to tournament models
    async def handle_create_or_join(self):

        player, user_created, player_created = await self.get_player()
        tournament, tourneament_created = await self.create_or_get_tournament(self.room_name)
        exits = await self.is_Player_Exists(tournament, player)

        if exits:
            return {
                "type" : "error",
                "error": "Player is already in tournament",
                "player" : self.username
                }
        if tourneament_created:
            type = "create"
            await self.add_player_to_tournament(tournament, player)
            await self.make_admin(tournament, player)
        else:
            type = "join"
            await self.add_player_to_tournament(tournament, player)
        usernames, admin = await self.get_player_usernames(tournament)
        self.joined = True
        return {
            "type" : type,
            "players" : usernames,
            "player" : self.username,
            "admin" : admin,
            "message" : "User joined the tournament."
        }





    """helper functions for database access"""

    @database_sync_to_async
    def assign_matches(self, tournament, matches):
        tournament.matches = matches
        tournament.save()

    @database_sync_to_async
    def find_tournament(self):
        return Tournament.objects.get(name=self.room_name)
    
    @database_sync_to_async
    def find_player(self, tournament):
        return tournament.players.filter(user__username=self.username).first()

    @database_sync_to_async
    def get_players(self, tournament):
        return list(tournament.players.filter(score__gte=0))

    @database_sync_to_async
    def get_tournament(self):
        try:
            return Tournament.objects.get(name=self.room_name)
        except Tournament.DoesNotExist:
            print(f"Tournament with name '{self.room_name}' does not exist.")
            return None


    @database_sync_to_async
    def assign_match(self, player1, player2, room_name):
        player1.opponent = player2.user.username
        player1.room = room_name
        player1.save()

        player2.opponent = player1.user.username
        player2.room = room_name
        player2.save()


    @database_sync_to_async
    def get_player_username(self, player):
        if player:
            return player.user.username
        else:
            return None

    @database_sync_to_async
    def create_or_get_tournament(self, tournament_name):
        with transaction.atomic():
            tournament, created = Tournament.objects.get_or_create(
                name=tournament_name,
                defaults={'num_players': 0, 'active': True}
            )
            return tournament, created


    @database_sync_to_async
    def add_player_to_tournament(self, tournament, player):
        with transaction.atomic():
            if not tournament.players.filter(user__username=player.user.username).exists():
                tournament.players.add(player)
                tournament.num_players = tournament.players.count()
                tournament.save()

    @database_sync_to_async
    def is_Player_Exists(self, tournament, player):
        with transaction.atomic():
            return tournament.players.filter(user=player.user).exists()

    @database_sync_to_async
    def make_admin(self, tournament, player):
        with transaction.atomic():
            player.admin = True
            player.save()
            tournament.save()

    @database_sync_to_async
    def get_player_usernames(self, tournament):
        with transaction.atomic():
            players = list(tournament.players.all())
            admin = tournament.players.filter(admin=True).first()
            if admin:
                admin_username = admin.user.username
                usernames = [player.user.username for player in players]
                return usernames, admin_username

    @database_sync_to_async
    def get_player(self):
        with transaction.atomic():
            try:
                user, user_created = User.objects.get_or_create(username=self.username)
                player, player_created = Player.objects.get_or_create(user=user)
                player.admin = False
                player.score = 0
                player.save()
                return player, user_created, player_created
            except User.DoesNotExist:
                return None

    @database_sync_to_async
    def remove_player_from_tournament(self, username):
        with transaction.atomic():
            try:
                player = Player.objects.get(user__username=username)
                tournament = Tournament.objects.filter(players=player).first()
                if tournament:
                    tournament.players.remove(player)
                    if player.admin:
                        other_players = tournament.players.exclude(user__username=player.user.username)
                        if other_players.exists():
                            new_admin = other_players.first()
                            new_admin.admin = True
                            new_admin.save()
                        else:
                            for player in tournament.players.all():
                                player.delete()
                            tournament.delete()
                            return
                    tournament.num_players = tournament.players.count()
                    tournament.save()
            except Player.DoesNotExist:
                pass

