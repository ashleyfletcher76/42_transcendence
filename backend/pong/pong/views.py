from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
import json
import logging
from django.utils import timezone
from pong.logic.game_logic import handle_local_input, handle_remote_input
import time
from .utils.redis_helper import get_game_state, set_game_state, delete_game_state
from .logic.game_logic import game_logic



logger = logging.getLogger(__name__)

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "ok"}, status=200)


# @api_view(['GET', 'POST'])
# def game_state_view(request, room_name):
#     try:
#         game = get_game_state(room_name)

#         if request.method == 'POST':
#             if game["player2"] == "remote":
#                 return Response(game)
#             if game["finished"]:
#                 response_data = {
#                     "game_state": game,
#                     "winner": game["winner"],
#                 }
#                 return Response(response_data, status=200)

#             if game["paused"]:
#                 if game["game_start_timer"] > 0:
#                     time_diff = time.time() - game["creation_time"]
#                     game["game_start_timer"] = int(max(0, 3 - time_diff))
#                     set_game_state(room_name, game)
#                     return Response(game)
#                 game["paused"] = False
#             else:
#                 player = request.data.get("player", {})
#                 keypress_p1 = request.data.get('keypress_p1', {})
#                 keypress_p2 = request.data.get('keypress_p2', {})
#                 try:
#                     if not player:
#                         handle_local_input(game, keypress_p1, keypress_p2)
#                     else:
#                         handle_remote_input(game, keypress_p1, player)
#                     game_logic(game)
#                 except:
#                     print("game logic error")
#             set_game_state(room_name, game)
#             return Response(game)

#         elif request.method == 'GET':
#             return Response(game)

#     except GameState.DoesNotExist:
#         return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_room(request):
    try:
        # Log the received data for debugging
        logging.info("Received request data: %s", request.body)
        data = json.loads(request.body)
        print(data)
        player_1 = data.get("player", "default")
        p2 = data.get("player_2", "default")
        game_type = data.get("gameType", "default")

        if game_type == "remote":
            waiting_room = get_game_state(room_name)
            if waiting_room:

                waiting_room["player2"] = player_1
                waiting_room["player2_timer"] = time.time()
                waiting_room["player1_timer"] = time.time()
                waiting_room["creation_time"] = time.time()

                return JsonResponse({
                    "message": "Joined an existing room",
                    "room_name": waiting_room["room_name"],
                    "game_state": waiting_room
                }, status=status.HTTP_200_OK)

        room_name = 'room-' + str(random.randint(1000, 9999))

        if game_type == "computer":
            player_2 = "AI"
        elif game_type == "local":
            player_2 = "local"
        elif game_type == "remote":
            player_2 = "remote"
        elif game_type == "tournament":
            player_2 = p2
        elif game_type == "private":
            player_2 = p2

        game_state = {
            "room_name" : room_name,
            "ball_x" : 0,
            "ball_y" : 0,
            "ball_speed_x" : random.choice([0.02, -0.02]),
            "ball_speed_y" : 0,
            "left_paddle_y" : 0,
            "right_paddle_y" : 0,
            "left_score" : 0,
            "right_score" : 0,
            "player1" : player_1,
            "player2" : player_2,
            "paused" : True,
            "game_type" : game_type,
            "game_start_timer" : 3,
            "creation_time" : time.time(),
            "player1_timer" : time.time(),
            "finished" : False,
            "p1_paddle" : "",
            "p2_paddle" : "",
        }

        set_game_state(room_name, game_state)

        response_data = {
            "message": "Room created successfully",
            "room_name": room_name,
            "game_state": game_state,
            "player1": game_state["player1"],
            "player2": game_state["player2"],
        }

        return JsonResponse(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        logging.error("Error handling room: %s", str(e))
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


