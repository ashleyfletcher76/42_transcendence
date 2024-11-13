from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random
import math
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view

import logging

logger = logging.getLogger(__name__)

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100

# Health check view to ensure the database connection is healthy
def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"status": "ok"}, status=200)

# Game view (renders the game HTML)
def game_view(request):
    return render(request, 'index.html')


@api_view(['GET', 'POST'])
def game_state_view(request, room_name):
    try:
        game = GameState.objects.get(room_name=room_name)

        if request.method == 'POST':
            paddle_direction = request.data.get('paddle_direction', {})
            is_paused = request.data.get('is_paused', None)
            side = request.data.get('side', None)


            if is_paused is not None:
                is_paused = bool(is_paused)
                print(f"Toggling pause: {is_paused}")
                if is_paused:
                    game.paused = not game.paused
                    print(f"Updated game paused state: {game.paused}")

            if not game.paused:
                game_logic(game)
                if side is not None and side == 0:
                    if paddle_direction.get('up', False):
                        move_right_paddle(game, -1)
                    if paddle_direction.get('down', False):
                        move_right_paddle(game, 1)
                elif side is not None and side == 1:
                    if paddle_direction.get('up', False):
                        move_left_paddle(game, -1)
                    if paddle_direction.get('down', False):
                        move_left_paddle(game, 1)

            game.save()
            print(f"Final game paused state: {game.paused}")

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

    if game.ball_y <= 0 or game.ball_y >= 1:
        game.ball_speed_y = -game.ball_speed_y

    if game.ball_x <= 0.02:
        if is_paddle_hit(game.left_paddle_y, game.ball_y):
            handle_paddle_hit(game, "left")
        else:
            game.right_score += 1
            reset_ball(game)

    elif game.ball_x >= 0.98:
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
    game.right_paddle_y += direction * 0.01
    game.right_paddle_y = max(0.05, min(0.95, game.right_paddle_y))

def move_left_paddle(game, direction):
    game.left_paddle_y += direction * 0.01
    game.left_paddle_y = max(0.05, min(0.95, game.left_paddle_y))

def handle_paddle_hit(game, side):
    game.ball_speed_x = -game.ball_speed_x

def reset_ball(game):
    game.ball_x, game.ball_y = 0.5, 0.5
    game.ball_speed_x *= -1

def is_paddle_hit(paddle_y, ball_y, paddle_height=0.2):
    paddle_top = paddle_y - paddle_height / 2
    paddle_bottom = paddle_y + paddle_height / 2
    return paddle_top <= ball_y <= paddle_bottom

@api_view(['POST'])
def create_room(request):
    try:
        data = json.loads(request.body)
        player2_is_ai = data.get("player2_is_ai", False)
        room_name = 'room-' + str(random.randint(1000, 9999))
        game_state = GameState.objects.create(
            room_name=room_name,
            ball_x=0.5,
            ball_y=0.5,
            ball_speed_x=random.choice([0.005, -0.005]),
            ball_speed_y=random.choice([0.005, -0.005]),
            left_paddle_y=0.5,
            right_paddle_y=0.5,
            left_score=0,
            right_score=0,
            player1="Player1",
            player2="AI" if player2_is_ai else None,
            paused=True
        )
        serializer = GameStateSerializer(game_state)
        return Response({
            "message": "Room created successfully",
            "room_name": room_name,
            "game_state": serializer.data
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# View for searching a room that is waiting for an opponent
@api_view(['GET'])
def search_room(request):
    try:
        waiting_room = GameState.objects.filter(player2=None).first()

        if waiting_room:
            waiting_room.player2 = "player_2"
            waiting_room.save()
            return JsonResponse({'room_name': waiting_room.room_name}, status=200)
        else:
            return JsonResponse({'room_name': None}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


health_check_logged = False

def health_check(request):
    global health_check_logged
    try:
        connection.ensure_connection()
    except Exception as e:
        # Log only on failure
        logger.error(f"Health check failed: {e}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    if not health_check_logged:
        health_check_logged = True
        logger.info("Health check passed: Service is up and running.")
    return HttpResponse("ok", content_type="text/plain", status=200)
