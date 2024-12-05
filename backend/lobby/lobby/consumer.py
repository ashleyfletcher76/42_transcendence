import django
django.setup()

from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import ObjectDoesNotExist
import json
from .models import Tournament, Player
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async
from django.db import transaction
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
        username = self.username
        if username:
            await self.remove_player_from_tournament()
            print(username, " removed from tournament.")

        print("debug!!!")
        response = await self.handle_leave()
        await self.lobby_message(response)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await super().disconnect(close_code)


    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action")
        print(data)
        tournament_name = data.get("tournament_name")
        username = data.get("nickname")
        sender = data.get("sender")
        message = data.get("message")

        if action == "create_or_join":
            self.username = username
            print(self.username)
            response = await self.handle_create_or_join()
            if self.joined:
                await self.lobby_message(response)
        elif action == "message":
            response = await self.handle_message(message=message, sender=sender)
            await self.lobby_message(response)






    """type funcitons"""
    async def message(self, event):
        message = event["message"]
        sender = event["sender"]
        await self.send(text_data=json.dumps({
            "type": "message",
            "sender": sender,
            "message": message
        }))
        
    async def error(self, event):
        error = event["error"]
        player = event["player"]
        if player == self.username:
            await self.send(text_data=json.dumps({
                "type": "error",
                "error": error,
                "player": player
            }))

    async def join(self, event):
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
        tournament, created = await self.create_or_get_tournament(self.room_name)
        usernames, admin = await self.get_player_usernames(tournament)
        return {
            "type": "leave",
            "players": usernames,
            "player": self.username,
            "admin": admin,
            "message" : "User left the room."
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




    #handle for joining with database changes to tournament models
    async def handle_create_or_join(self):
        
        player, user_created, player_created = await self.get_player()
        tournament, tourneament_created = await self.create_or_get_tournament(self.room_name)
        
        if tourneament_created:
            type = "create"
            await self.add_player_to_tournament(tournament, player)
            await self.make_admin(tournament, player)
        else:
            type = "join"
            exits = await self.is_Player_Exists(tournament, player)
            if exits:
                return {
                    "type" : "error",
                    "error": "Player is already in tournament",
                    "player" : self.username
                    }
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






    """helper function for database access"""
    @sync_to_async
    def create_or_get_tournament(self, tournament_name):
        with transaction.atomic():
            tournament, created = Tournament.objects.get_or_create(
                name=tournament_name,
                defaults={'num_players': 0, 'active': True}
            )
            return tournament, created


    @sync_to_async
    def add_player_to_tournament(self, tournament, player):
        with transaction.atomic():
            tournament.players.add(player)
            tournament.num_players = tournament.players.count()
            tournament.save()

    @sync_to_async
    def is_Player_Exists(self, tournament, player):
        with transaction.atomic():
            return tournament.players.filter(user=player.user).exists()

    @sync_to_async
    def make_admin(self, tournament, player):
        with transaction.atomic():
            player.admin = True
            player.save()
            tournament.save()

    @sync_to_async
    def get_player_usernames(self, tournament):
        with transaction.atomic():
            players = list(tournament.players.all())
            admin = tournament.players.filter(admin=True).first()
            admin_username = admin.user.username
            usernames = [player.user.username for player in players]
            return usernames, admin_username

    @sync_to_async
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

    @sync_to_async
    def remove_player_from_tournament(self):
        with transaction.atomic():
            try:
                player = Player.objects.get(user__username=self.username)
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


