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

logger = logging.getLogger(__name__)

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
END_SCORE = 5
SPEED_PADDLE = 0.05

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "ok"}, status=200)

def game_view(request):
    return render(request, 'index.html')

@api_view(['GET', 'POST'])
def game_state_view(request, room_name):
    try:
        game = GameState.objects.get(room_name=room_name)

        if request.method == 'POST':

            if game.player2 == "remote":
                game.save()
                serializer = GameStateSerializer(game)
                return Response(serializer.data)

            player = request.data.get("player", {})
            keypress_p1 = request.data.get('keypress_p1', {})
            keypress_p2 = request.data.get('keypress_p2', {})

            if game.paused == False:
                game_logic(game)
                if not player:
                    if keypress_p1 == 'up':
                        move_left_paddle(game, -1)
                    if keypress_p1 == 'down' :
                        move_left_paddle(game, 1)
                    if game.player2 == "local":
                        if keypress_p2 == 'up':
                            move_right_paddle(game, -1)
                        if keypress_p2 == 'down':
                            move_right_paddle(game, 1)
                else:
                    if keypress_p1 == 'up' and player == game.player1:
                        move_left_paddle(game, -1)
                    if keypress_p1 == 'down' and player == game.player1:
                        move_left_paddle(game, 1)
                    if keypress_p1 == 'up' and player == game.player2:
                        move_right_paddle(game, -1)
                    if keypress_p1 == 'down' and player == game.player2:
                        move_right_paddle(game, 1)

            if game.right_score >= END_SCORE or game.left_score >= END_SCORE:
                if game.right_score >= END_SCORE:
                    winner = game.player1
                else:
                    winner = game.player2
                game.paused = True
                game.save()
                serializer = GameStateSerializer(game)
                response_data = {
                    "game_state": serializer.data,
                    "winner": winner,
                }
                return Response(response_data, status=200)
            game.save()

            serializer = GameStateSerializer(game)
            return Response(serializer.data)

        elif request.method == 'GET':
            serializer = GameStateSerializer(game)
            return Response(serializer.data)

    except GameState.DoesNotExist:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

def game_logic(game):
    game.ball_x += game.ball_speed_x
    game.ball_y += game.ball_speed_y

    if game.ball_y <= -1 or game.ball_y >= 1:
        game.ball_speed_y = -game.ball_speed_y

    if game.ball_x <= -0.95:
        if is_paddle_hit(game.left_paddle_y, game.ball_y):
            handle_paddle_hit(game, "left")
        else:
            game.right_score += 1
            reset_ball(game)

    elif game.ball_x >= 0.95:
        if is_paddle_hit(game.right_paddle_y, game.ball_y):
            handle_paddle_hit(game, "right")
        else:
            game.left_score += 1
            reset_ball(game)

    if game.player2 == "AI":
        update_ai(game)

def update_ai(game):
    if game.ball_y < game.right_paddle_y:
        move_right_paddle(game, -1)
    elif game.ball_y > game.right_paddle_y:
        move_right_paddle(game, 1)

def move_right_paddle(game, direction):
    game.right_paddle_y += direction * SPEED_PADDLE
    game.right_paddle_y = max(-1, min(1, game.right_paddle_y))

def move_left_paddle(game, direction):
    game.left_paddle_y += direction * SPEED_PADDLE
    game.left_paddle_y = max(-1, min(1, game.left_paddle_y))

def handle_paddle_hit(game, side):
    game.ball_speed_x = -game.ball_speed_x

def reset_ball(game):
    game.ball_x, game.ball_y = 0, 0
    game.ball_speed_x *= -1

def is_paddle_hit(paddle_y, ball_y, paddle_height=0.2):
    paddle_top = paddle_y - paddle_height / 2
    paddle_bottom = paddle_y + paddle_height / 2
    return paddle_top <= ball_y <= paddle_bottom



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
        print(player_1)
        print(game_type)

        if game_type == "remote":
            waiting_room = GameState.objects.filter(player2="remote").first()
            if waiting_room:
                waiting_room.player2 = player_1
                waiting_room.paused = False
                waiting_room.save()

                return JsonResponse({
                    "message": "Joined an existing room",
                    "room_name": waiting_room.room_name,
                    "game_state": GameStateSerializer(waiting_room).data
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

        # Create a new game state instance
        game_state = GameState.objects.create(
            room_name=room_name,
            ball_x=0,
            ball_y=0,
            ball_speed_x=random.choice([0.02, -0.02]),
            ball_speed_y=random.choice([0.02, -0.02]),
            left_paddle_y=0,
            right_paddle_y=0,
            left_score=0,
            right_score=0,
            player1=player_1,
            player2=player_2,
            paused=False,
            game_type=game_type
        )
        game_state.save()
        print(game_state.player1)
        print(game_state.player2)

        serializer = GameStateSerializer(game_state)

        response_data = {
            "message": "Room created successfully",
            "room_name": room_name,
            "game_state": serializer.data,
            "player1": serializer.data["player1"],
            "player2": serializer.data["player2"],
        }

        return JsonResponse(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        logging.error("Error handling room: %s", str(e))
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

health_check_logged = False

def health_check(request):
    global health_check_logged
    try:
        connection.ensure_connection()
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    if not health_check_logged:
        health_check_logged = True
        logger.info("Health check passed: Service is up and running.")
    return HttpResponse("ok", content_type="text/plain", status=200)
