import django
django.setup()

from channels.generic.websocket import WebsocketConsumer
from django.db.models import ObjectDoesNotExist
import json
from .models import Tournament, Player
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async
import random
import requests

class TournamentConsumer(WebsocketConsumer):

    active_connections = {}
    game_service_url = "http://pong-game:8000/pong"

    def connect(self):
        self.tournament_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.username = self.scope["user"].username if self.scope["user"].is_authenticated else None
        TournamentConsumer.active_connections[self.username] = self
        self.accept()

    def disconnect(self, close_code):
        if self.username in TournamentConsumer.active_connections:
            del TournamentConsumer.active_connections[self.username]
        username = self.scope.get("username")
        if username:
            self.remove_player_from_tournament(username)


    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        action = data.get("action")
        tournament_name = data.get("tournament_name")
        username = data.get("nickname")
        sender = data.get("sender")
        message = data.get("message")

        #if not tournament_name or not username:
        #    await self.notify_user("username", "Tournament or player not found!")
        if action == "create_or_join":
            self.scope["username"] = username
            response = self.handle_create_or_join(tournament_name, username)
            self.broadcast_message(response)
        elif action == "message":
            response = self.lobby_message(message, sender)
            self.broadcast_message(response)
        elif action == "start_tournament":
            response = self.start_tournament()
            self.broadcast_message(response)
        elif action == "winner":
            response = self.game_result(data)
            self.send(json.dumps(response))
        else:
            self.send(json.dumps({"error": "Invalid action."}))


    def lobby_message(self, message, sender):
        print(message)
        print(sender)
        return {
            "type": "message",
            "sender": sender,
            "message": message
        }

    def broadcast_message(self, message):
        for connection in TournamentConsumer.active_connections.values():
            connection.send(json.dumps(message))


    def game_result(self, data):
        username = self.scope["username"]
        player = Player.objects.get(user__username=username)

    def start_tournament(self):
        try:
            tournament = Tournament.objects.get(name=self.tournament_name)
            players = list(tournament.players.all())
            admin = Player.objects.get(user__username=self.scope["username"]).admin
            if not admin:
                print({"error": "You are not the admin of this lobby!"})
                return {"error": "You are not the admin of this lobby!"}
            random.shuffle(players)
            numPlayers = tournament.num_players
            matches = []
            for i in range(0, len(players), 2):
                if i + 1 < numPlayers:
                    matches.append({
                        "player1": {"username": players[i].user.username, "score": players[i].score},
                        "player2": {"username": players[i + 1].user.username, "score": players[i + 1].score},
                    })
                else:
                    matches.append({
                    "player1": {"username": players[i].user.username, "score": players[i].score},
                    "player2": None,
                })
            for match in matches:
                player1 = match["player1"]["username"]
                player2 = match["player2"]["username"] if match["player2"] else None
                if player2:
                    room_data = self.create_game_room(player1, player2)
                    self.notify_match(player1, player2, room_data)
                else:
                    self.notify_bye(player1)
            return {"type": "start", "message": "Tournament started"}
        except Tournament.DoesNotExist:
            return {"error": "Matchkaing Error!"}

    def notify_match(self, player1, player2, room_data):
        room_name = room_data.get("room_name")
        if player1 in self.active_connections:
            connection = self.active_connections[player1]
            connection.send(json.dumps({
                "type": "match",
                "player1": player1,
                "player2": player2,
                "room" : room_name,
                "room_data" : room_data
            }))
        if player2 in self.active_connections:
            connection = self.active_connections[player2]
            connection.send(json.dumps({
                "type": "match",
                "player1": player1,
                "player2": player2,
                "room" : room_name,
                "room_data" : room_data
            }))

    def notify_bye(self, player):
        if player in self.active_connections:
            connection = self.active_connections[player]
            connection.send(json.dumps({
                "type": "message",
                "message" : "You have a bye this Round. Please wait for the next round."
            }))

    def create_game_room(self, player1, player2):
        url = f"{self.game_service_url}/pong/create-room"
        payload = {
            "gameType": "tournament",
            "player": player1,
            "player_2" : player2,
        }
        try:
            response = requests.post(url, json=payload)
            if response.status_code == 201:
                room_data = response.json()
                print(f"Game room created: {room_data}")
                return room_data
            else:
                print(f"Failed to create room: {response.json()}")
                return {"error": "Failed to create room"}
        except requests.exceptions.RequestException as e:
            print(f"Failed to create room: {e}")
            return {"error": "Service unavailable"}



    def notify_user(self, username, message):
        consumer_instance = TournamentConsumer.active_connections.get(username)
        if consumer_instance:
            consumer_instance.send(json.dumps({"notification": message}))


    def get_player_list(self):
        try:
            tournament = Tournament.objects.get(name=self.tournament_name)
            players = tournament.players.all().values_list("user__username", "admin")
            player_list = []
            for username, is_admin in players:
                player_data = {
                    "username": username,
                    "admin": is_admin
                }
                player_list.append(player_data)
            return {"players":list(player_list)}
        except Tournament.DoesNotExist:
            return {"error": "Tournament not found"}

    def remove_player_from_tournament(self, username):
        try:
            player = Player.objects.get(user__username=username)
            tournament = Tournament.objects.filter(players=player).first()
            if tournament:
                tournament.players.remove(player)
                if player.admin:
                    other_players = tournament.players.exclude(id=player.id)
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



    def get_player(self, username):
        try:
            user, user_created = User.objects.get_or_create(username=username)
            player, player_created = Player.objects.get_or_create(user=user)
            player.admin = False
            player.score = 0
            player.save()
            return player
        except User.DoesNotExist:
            return None


    def create_or_get_tournament(self, tournament_name):
        return Tournament.objects.get_or_create(
            name=tournament_name,
            defaults={'num_players': 0, 'active': True}
        )

    def add_player_to_tournament(self, tournament, player):
        tournament.players.add(player)
        tournament.num_players = tournament.players.count()
        tournament.save()

    def is_Player_Exists(self, tournament, player):
        return tournament.players.filter(user=player.user).exists()

    def make_admin(self, tournament, player):
        player.admin = True
        player.save()
        tournament.save()

    def get_players_usernames(self, tournament):
        players = list(tournament.players.all())
        usernames = [player.user.username for player in players]
        return usernames


    def handle_create_or_join(self, tournament_name, username):
        player = self.get_player(username)
        if not player:
            return {"error": "Player does not exists"}
    
        tournament, created = (self.create_or_get_tournament(tournament_name))

        if created:
            self.add_player_to_tournament(tournament, player)
            self.make_admin(tournament, player)
        else:
            exits = self.is_Player_Exists(tournament, player)
            if exits:
                print("returning from here")
                return {"error": "Player is already in tournament"}
            self.add_player_to_tournament(tournament, player)

        usernames = self.get_players_usernames(tournament)
        return {
            "type": "join/create",
            "players": usernames,
            "player": player.user.username
        }
