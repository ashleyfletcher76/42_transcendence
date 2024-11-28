import django
django.setup()

from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import ObjectDoesNotExist
import json
from .models import Tournament, Player
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async
import random

class TournamentConsumer(AsyncWebsocketConsumer):

    active_connections = {}

    async def connect(self):
        self.tournament_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.username = self.scope["user"].username if self.scope["user"].is_authenticated else None
        TournamentConsumer.active_connections[self.username] = self
        await self.accept()

    async def disconnect(self, close_code):
        if self.username in TournamentConsumer.active_connections:
            del TournamentConsumer.active_connections[self.username]
        username = self.scope.get("username")
        if username:
            await self.remove_player_from_tournament(username)


    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")
        tournament_name = data.get("tournament_name")
        username = data.get("username")

        #if not tournament_name or not username:
        #    await self.notify_user("username", "Tournament or player not found!")
        if action == "create_or_join":
            self.scope["username"] = username
            response = await self.handle_create_or_join(tournament_name, username)
            await self.send(json.dumps(response))
        elif action == "start_tournament":
            response = await self.start_tournament(username)
            await self.send(json.dumps(response))
        elif action == "player_list":
            response = await self.get_player_list()
            await self.send(json.dumps(response))
        else:
            await self.send(json.dumps({"error": "Invalid action."}))


    @sync_to_async
    def start_tournament(self, username):
        try:
            tournament = Tournament.objects.get(name=self.tournament_name)
            players = list(tournament.players.all())
            admin = Player.objects.get(user__username=username)
            if not admin.admin:
                return {"error": "You are not the admin of this lobby!"}
            random.shuffle(players)
            numPlayers = tournament.num_players
            print(len(players))
            print(numPlayers)
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
            print(matches)
            for match in matches:
                player1 = match["player1"]["username"]
                player2 = match["player2"]["username"] if match["player2"] else None
                if player2:
                    self.notify_match(player1, player2)
                    self.notify_match(player2, player1)
                else:
                    self.notify_bye(player1)
            return {"message": "Tournament matchmaking started.", "matches": matches}
        except Tournament.DoesNotExist:
            print("matchmaking error!")
            return {"error": "Matchkaing Error!"}

    def notify_match(self, player1, player2):
        if player1 in self.active_connections:
            connection = self.active_connections[player1]
            connection.send(json.dumps({
                "type": "match",
                "opponent": player2,
            }))

    def notify_bye(self, player):
        if player in self.active_connections:
            connection = self.active_connections[player]
            connection.send(json.dumps({
                "type": "bye",
                "message" : "You have a bye this Round. Please wait for the next round."
            }))

    @sync_to_async
    def notify_user(self, username, message):
        consumer_instance = TournamentConsumer.active_connections.get(username)
        if consumer_instance:
            consumer_instance.send(json.dumps({"notification": message}))


    @sync_to_async
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
            print(player_list)
            return {"players":list(player_list)}
        except Tournament.DoesNotExist:
            return {"error": "Tournament not found"}

    @sync_to_async
    def remove_player_from_tournament(self, username):
        try:
            player = Player.objects.get(user__username=username)
            tournaments = Tournament.objects.filter(players=player)
            for tournament in tournaments:
                tournament.players.remove(player)
                tournament.num_players -= 1
                if (tournament.num_players <= 0):
                    tournament.active = False
                    del tournament
                tournament.save()
        except Player.DoesNotExist:
            pass


    @sync_to_async
    def get_player(self, username):
        try:
            user, user_created = User.objects.get_or_create(username=username)
            player, player_created = Player.objects.get_or_create(user=user)
            return player
        except User.DoesNotExist:
            return None

    @sync_to_async
    def create_or_get_tournament(self, tournament_name):
        return Tournament.objects.get_or_create(
            name=tournament_name,
            defaults={'num_players': 0, 'active': True}
        )

    @sync_to_async
    def add_player_to_tournament(self, tournament, player):
        tournament.players.add(player)
        tournament.num_players += 1
        tournament.save()

    @sync_to_async
    def is_Player_Exists(self, tournament, player):
        return tournament.players.filter(user=player.user).exists()

    @sync_to_async
    def make_admin(self, tournament, player):
        player.admin = True
        player.save()
        tournament.save()

    async def handle_create_or_join(self, tournament_name, username):
        player = await self.get_player(username)
        if not player:
            return {"error": "Player does not exists"}
    
        tournament, created = await (self.create_or_get_tournament(tournament_name))

        if created:
            await self.add_player_to_tournament(tournament, player)
            await self.make_admin(tournament, player)
            return {"message": "Tournament created and player added.", "tournament_name": tournament_name}
        else:
            exits = await self.is_Player_Exists(tournament, player)
            if exits:
                return {"error": "Player is already in tournament"}

            await self.add_player_to_tournament(tournament, player)
            return {"message": "Player added to the tournament.", "tournament_name": tournament_name}
