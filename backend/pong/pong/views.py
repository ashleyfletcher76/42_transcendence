from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random
import math
from django.http import JsonResponse
from django.db import connection
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view


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

        if request.method == 'GET':
            serializer = GameStateSerializer(game)
            return Response(serializer.data)

        elif request.method == 'POST':
            paddle_direction = request.data.get('paddle_direction', {})
            is_paused = request.data.get('is_paused', None)
            side = request.data.get('side', None)
            print(" pause button is pressed : ",  is_paused)
            print(" game status : ", not game.paused)
            if is_paused:
                game.paused = not game.paused
            if game.paused:
                game_logic(game)
                if side == 0:
                    if (paddle_direction['up'] == True):
                        move_right_paddle(game, -1)
                    if (paddle_direction['down'] == True):
                        move_right_paddle(game, 1)
                elif side == 1:
                    if (paddle_direction['up'] == True):
                        move_left_paddle(game, -1)
                    if (paddle_direction['down'] == True):
                        move_left_paddle(game, 1)

            game.save()

            serializer = GameStateSerializer(game)
            return Response(serializer.data)

    except GameState.DoesNotExist:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

def game_logic(game):
    game.ball_x += game.ball_speed_x
    game.ball_y += game.ball_speed_y
    
    if game.ball_y <= 0 or game.ball_y >= 1:
        game.ball_speed_y = -game.ball_speed_y

    if game.ball_x <= 0.08:
        if is_paddle_hit(game.left_paddle_y, game.ball_y):
            handle_paddle_hit(game, "left")

    if game.ball_x >= 0.92:
        if game.player2 == 'AI':  # AI control
            update_ai(game)
        elif is_paddle_hit(game.right_paddle_y, game.ball_y):
            handle_paddle_hit(game, "right")

    if game.ball_x <= 0:
        game.right_score += 1  # Player2 (right) scores
        reset_ball(game)
    elif game.ball_x >= 1:
        game.left_score += 1  # Player1 (left) scores
        reset_ball(game)
    print(game.player2)
    if game.player2 == "AI":
        update_ai(game)

def is_paddle_hit(paddle_y, ball_y):
    return paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= ball_y <= paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT

def handle_paddle_hit(game_state, paddle_side):
    paddle_y = game_state.left_paddle_y if paddle_side == "left" else game_state.right_paddle_y
    hit_position = (paddle_y * SCREEN_HEIGHT) - (game_state.ball_position_y * SCREEN_HEIGHT)
    angle_factor = hit_position / (PADDLE_HEIGHT / 2)
    angle = angle_factor * (math.pi / 3)
    game_state.ball_speed_x = -game_state.ball_speed_x
    game_state.ball_speed_y = math.sin(angle) * 0.005
    game_state.ball_speed_x *= 1.1
    game_state.ball_speed_y *= 1.1

def reset_ball(game_state):
    game_state.ball_position_x = 0.5
    game_state.ball_position_y = 0.5
    game_state.ball_speed_x = random.choice([0.005, -0.005])
    game_state.ball_speed_y = random.choice([0.005, -0.005])

def update_ai(game_state):
    if game_state.ball_position_y < game_state.right_paddle_y:
        move_right_paddle(game_state, -1)
    elif game_state.ball_position_y > game_state.right_paddle_y:
        move_right_paddle(game_state, 1)

def move_right_paddle(game_state, direction):
    game_state.right_paddle_y += direction * 0.01
    game_state.right_paddle_y = max(0.05, min(0.95, game_state.right_paddle_y))

def move_left_paddle(game_state, direction):
    game_state.left_paddle_y += direction * 0.01
    game_state.left_paddle_y = max(0.05, min(0.95, game_state.right_paddle_y))



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

