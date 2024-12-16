import django
django.setup()

from channels.generic.websocket import WebsocketConsumer
from django.core.exceptions import ObjectDoesNotExist
from .models import Tournament, Player
from django.contrib.auth.models import User
from django.db import transaction
import requests
import json
import random
from asgiref.sync import async_to_sync



class TournamentConsumer(WebsocketConsumer):
    game_service_url = "http://pong-game:8000/pong"

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"tournament_{self.room_name}"
        self.username = None
        self.joined = False

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        print(f"Disconnecting {self.username}, {close_code}")
        if self.username:
            self.remove_player_from_tournament(self.username)
        response = self.handle_leave()
        self.lobby_message(response)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        action = data.get("action")
        username = data.get("nickname")
        sender = data.get("sender")
        message = data.get("message")
        winner = data.get("winner")

        if action == "create_or_join":
            self.username = username
            response = self.handle_create_or_join()
            self.lobby_message(response)
        elif action == "message":
            response = self.handle_message(message=message, sender=sender)
            self.lobby_message(response)
        elif action == "start_tournament":
            response = self.start_tournament("Tournament started!")
            self.lobby_message(response)
        elif action == "winner":
            self.get_winner(winner)
            tournament = Tournament.objects.get(name=self.room_name)
            if not tournament.matches:
                response = self.start_tournament("Next round is starting!")
                self.lobby_message(response)


    """ Helper functions """
    
    
    """Leave"""
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


    """join"""
    def handle_create_or_join(self):
        try:
            player, _ = self.get_or_create_player()
            tournament, created = self.get_or_create_tournament(self.room_name)

            if self.is_player_exists(tournament, player):
                return {
                    "type": "error",
                    "error": "Player is already in the tournament",
                    "player": self.username
                }

            if created:
                self.add_player_to_tournament(tournament, player)
                self.make_admin(player)
                tournament.active = True
                tournament.save()
                response_type = "create"
            else:
                self.add_player_to_tournament(tournament, player)
                player.admin = False
                player.save()
                response_type = "join"

            self.joined = True
            players, admin = self.get_player_usernames(tournament)
            print("Success!")
            print(tournament.name)
            return {
                "type": response_type,
                "players": players,
                "player": self.username,
                "admin": admin,
                "message": "User joined the tournament."
            }
        except Exception as e:
            return {"type": "error", "error": str(e), "player": self.username}





    """start tournament"""
    def start_tournament(self, message):
        try:
            tournament = Tournament.objects.get(name=self.room_name)
            if tournament.players.count() < 2:
                return {
                    "type": "error",
                    "error": "Not enough players to start the tournament.",
                    "player" : self.username
                }
            players = list(tournament.players.all())
            random.shuffle(players)
            matches = self.create_matches(players)
            tournament.matches = matches
            tournament.save()
            self.lobby_message({"type": "start", "message": message})
            return {"type" : "match"}
        except ObjectDoesNotExist:
            return {"type": "error", "error": "Tournament not found.", "player": self.username}

    def create_matches(self, players):
        matches = []
        for i in range(0, len(players), 2):
            player1 = players[i]
            player2 = players[i + 1] if i + 1 < len(players) else None
            room_name = self.get_game_room(player1, player2)
            self.assign_match(player1, player2, room_name)
            matches.append({"player1": player1.user.username, "player2": player2.user.username, "room": room_name})
        print(matches)
        return matches

    def get_game_room(self, player1, player2):
        data = {"player1": player1.user.username, "player2": player2.user.username, "gameType": "tournament"}
        game_service_url = "http://pong-game:8000/pong/pong/create-room"
        response = requests.post(game_service_url, json=data)
        if response.status_code == 201:
            response_data = response.json()
            room_name = response_data.get("room_name")
            print(room_name)
            return room_name
        return None

    def assign_match(self, player1, player2, room_name):
        player1.opponent = player2.user.username
        player1.room = room_name
        player1.save()

        player2.opponent = player1.user.username
        player2.room = room_name
        player2.save()









    """next rounds and getting winners"""
    

    def get_winner(self, winner):
        tournament = Tournament.objects.get(name=self.room_name)
        if not tournament:
            return {
                "type" : "error",
                "error" : "Tournament not found.",
                "plyer" : self.username
            }
        response = self.decide_match(tournament, winner)
        self.lobby_message(response)



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

        return {"type" : "message", "message" : f"{winner} won against {loser}"}


    def get_game_info(self, player1, room):
        game_service_url = f"http://pong-game:8000/pong/pong/game_state/{room}"
        try:
            response = requests.get(game_service_url)

            if response.status_code == 200:
                response_data = response.json()
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














    """database accesss"""
    def get_or_create_player(self):
        user, _ = User.objects.get_or_create(username=self.username)
        player, created = Player.objects.get_or_create(user=user)
        return player, created

    def get_or_create_tournament(self, room_name):
        return Tournament.objects.get_or_create(name=room_name)


    def is_player_exists(self, tournament, player):
        return tournament.players.filter(id=player.id).exists()


    def add_player_to_tournament(self, tournament, player):
        tournament.players.add(player)
        tournament.num_players += 1
        tournament.save()


    def make_admin(self, player):
        player.admin = True
        player.save()

    def get_player_usernames(self, tournament):
        players = list(tournament.players.all())
        usernames = [player.user.username for player in players]
        admin = tournament.players.filter(admin=True).first()
        return usernames, admin.user.username









    """Sending message helpers"""
    def handle_message(self, message, sender):
        return {
            "type": "message",
            "sender": sender,
            "message": message
        }

    def lobby_message(self, response):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            response
        )

    def start(self, event):
        if self.check_disconnect():
            return
        message = event["message"]
        self.send(text_data=json.dumps({
            "type": "start",
            "message": message
        }))


    def finished(self, event):
        self.disconnect(1005)

    def handle_leave(self):
        try:
            tournament = (Tournament.objects.get)(name=self.room_name)
            usernames, admin = self.get_player_usernames(tournament)
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
                "player": self.username
            }

    """Sending message to socket"""
    def join(self, event):
        if self.check_disconnect():
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        self.send(text_data=json.dumps({
            "type": "join",
            "players": players,
            "player": player,
            "admin": admin,
            "message" : message
        }))
        
    def create(self, event):
        if self.check_disconnect():
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        self.send(text_data=json.dumps({
            "type": "create",
            "players": players,
            "player": player,
            "admin" : admin,
            "message" : message
        }))

    def leave(self, event):
        if self.check_disconnect():
            return
        players = event["players"]
        player = event["player"]
        message = event["message"]
        admin = event["admin"]
        self.send(text_data=json.dumps({
            "type": "leave",
            "players": players,
            "player": player,
            "admin" : admin,
            "message" : message
        }))

    def message(self, event):
        if self.check_disconnect():
            return

        message = event["message"]
        sender = event["sender"]
        self.send(text_data=json.dumps({
            "type": "message",
            "sender": sender,
            "message": message
        }))

    def error(self, event):
        if self.check_disconnect():
            return
        error = event["error"]
        player = event["player"]
        if player == self.username:
            self.send(text_data=json.dumps({
                "type": "error",
                "error": error,
                "player": player
            }))
    
    def tournament_winner(self, event):
        if self.check_disconnect():
            return
        winner = event["winner"]
        self.lobby_message({
            "type" : "finished"
        })
        self.send(text_data=json.dumps({
            "type": "tournament_winner",
            "winner": winner
        }))


    def match(self, event):
        if self.check_disconnect():
            return
        try:
            tournament = Tournament.objects.get(name=self.room_name)
        except Tournament.DoesNotExist:
            self.send(text_data=json.dumps({
                "type": "error",
                "error": f"Tournament with name '{self.room_name}' not found.",
                "player" : self.username 
            }))
            return

        player = tournament.players.filter(user__username=self.username).first()

        if not player:
            self.send(text_data=json.dumps({
                "type": "error",
                "error": "Player not found in the tournament.",
                "player" : self.username
            }))
            self.disconnect(1005)
            return
        player1 = self.username
        player2 = player.opponent
        roomname = player.room
        self.send(text_data=json.dumps({
            "type": "match",
            "player1" : player1,
            "player2" : player2,
            "room" : roomname,
        }))
        print(f"match info send to {self.username}")
        print({
            "type": "match",
            "player1" : player1,
            "player2" : player2,
            "room" : roomname,
        })


    def check_disconnect(self):
        if not self.joined:
            self.disconnect()
            return True

        tournament = Tournament.objects.filter(name=self.room_name).first()
        if not tournament:
            self.disconnect()
            return True

        player = tournament.players.filter(user__username=self.username)
        if not player.exists():
            self.disconnect()
            return True