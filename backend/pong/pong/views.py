from rest_framework.response import Response
from rest_framework import status
import uuid
import random
from django.http import JsonResponse
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework import status
import json
import logging
import time
from .utils.redis_helper import get_game_state, set_game_state, find_remote_game_states



logger = logging.getLogger(__name__)

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "ok"}, status=200)


@api_view(['GET'])
def game_state_view(request, room_name):
    try:
        game = get_game_state(room_name)

        if request.method == 'GET':
            return Response(game)

    except:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)


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
        print(game_type)
        print(player_1)

        if game_type == "remote":
            waiting_room = find_remote_game_states()
            if waiting_room:

                waiting_room["player2"] = player_1
                waiting_room["player2_timer"] = time.time()
                waiting_room["player1_timer"] = time.time()
                waiting_room["creation_time"] = time.time()
                set_game_state(waiting_room["room_name"], waiting_room)
                return JsonResponse({
                    "message": "Joined an existing room",
                    "room_name": waiting_room["room_name"],
                    "game_state": waiting_room,
                    "player1": waiting_room["player1"],
                    "player2": waiting_room["player2"],
                }, status=status.HTTP_200_OK)

        room_name = f"room-{uuid.uuid4().hex[:8]}"

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
            "player1_id" : 0,
            "player2_id" : 0,
            "p1_connected" : False,
            "p2_connected" : False,
            "predict_ai" : 0,
            "ai_mode" : 0,
            "paused" : True,
            "paused_d" : False,
            "started" : False,
            "game_type" : game_type,
            "game_start_timer" : 4,
            "creation_time" : time.time(),
            "player1_timer" : time.time(),
            "player2_timer" : time.time(),
            "finished" : False,
            "p1_paddle" : "",
            "p2_paddle" : "",
            "endloop" : False,
            "winner" : "",
            "player1_token": "",
            "player2_token": ""
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

