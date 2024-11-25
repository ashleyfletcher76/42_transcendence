import django
django.setup()

from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import ObjectDoesNotExist
import json
from .models import Tournament, Player
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async

class TournamentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")
        tournament_name = data.get("tournament_name")
        username = data.get("username")

        if not tournament_name or not username:
            await self.send(json.dumps({"error": "Tournament name and username are required."}))
            return

        if action == "create_or_join":
            response = await self.handle_create_or_join(tournament_name, username)
            await self.send(json.dumps(response))
        else:
            await self.send(json.dumps({"error": "Invalid action."}))

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
            defaults={'num_players': 1, 'active': True}
        )

    @sync_to_async
    def add_player_to_tournament(self, tournament, player):
        tournament.players.add(player)
        tournament.num_players += 1
        tournament.save()

    @sync_to_async
    def is_Player_Exists(self, tournament, player):
        return tournament.players.filter(user=player.user).exists()

    async def handle_create_or_join(self, tournament_name, username):
        player = await self.get_player(username)
        if not player:
            return {"error": "Player does not exists"}
    
        tournament, created = await (self.create_or_get_tournament(tournament_name))

        if created:
            await self.add_player_to_tournament(tournament, player)
            return {"message": "Tournament created and player added.", "tournament_name": tournament_name}
        else:
            exits = await self.is_Player_Exists(tournament, player)
            if exits:
                return {"error": "Player is already in tournament"}

            await self.add_player_to_tournament(tournament, player)
            return {"message": "Player added to the tournament.", "tournament_name": tournament_name}
