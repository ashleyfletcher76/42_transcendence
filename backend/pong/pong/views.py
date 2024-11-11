from rest_framework.views import APIView
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

# View for getting the game state
class GameStateView(APIView):
    def get(self, request, room_name):
        try:
            game = GameState.objects.get(room_name=room_name)
            serializer = GameStateSerializer(game)
            return Response(serializer.data)
        except GameState.DoesNotExist:
            return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

# View for updating the game state (e.g., updating ball position, handling collisions, etc.)
class UpdateGameView(APIView):
    def post(self, request, room_name):
        try:
            game_state = GameState.objects.get(room_name=room_name)
            game_state.ball_position_x += game_state.ball_speed_x
            game_state.ball_position_y += game_state.ball_speed_y

            if game_state.ball_position_y <= 0 or game_state.ball_position_y >= 1:
                game_state.ball_speed_y = -game_state.ball_speed_y

            if game_state.ball_position_x <= 0.08:
                if self.is_paddle_hit(game_state.left_paddle_y, game_state.ball_position_y):
                    self.handle_paddle_hit(game_state, "left")

            if game_state.ball_position_x >= 0.92:
                if game_state.player2 == 'AI':  # AI control
                    self.update_ai(game_state)
                elif self.is_paddle_hit(game_state.right_paddle_y, game_state.ball_position_y):
                    self.handle_paddle_hit(game_state, "right")

            if game_state.ball_position_x <= 0:
                game_state.score_player2 += 1
                self.reset_ball(game_state)
            elif game_state.ball_position_x >= 1:
                game_state.score_player1 += 1
                self.reset_ball(game_state)
            if game_state.player2 == "ai":
                self.update_ai()

            game_state.save()
            serializer = GameStateSerializer(game_state)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except GameState.DoesNotExist:
            return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

    def is_paddle_hit(self, paddle_y, ball_y):
        return paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= ball_y <= paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT

    def handle_paddle_hit(self, game_state, paddle_side):
        paddle_y = game_state.left_paddle_y if paddle_side == "left" else game_state.right_paddle_y
        hit_position = (paddle_y * SCREEN_HEIGHT) - (game_state.ball_position_y * SCREEN_HEIGHT)
        angle_factor = hit_position / (PADDLE_HEIGHT / 2)
        angle = angle_factor * (math.pi / 3)
        game_state.ball_speed_x = -game_state.ball_speed_x
        game_state.ball_speed_y = math.sin(angle) * 0.005
        game_state.ball_speed_x *= 1.1
        game_state.ball_speed_y *= 1.1

    def reset_ball(self, game_state):
        game_state.ball_position_x = 0.5
        game_state.ball_position_y = 0.5
        game_state.ball_speed_x = random.choice([0.005, -0.005])
        game_state.ball_speed_y = random.choice([0.005, -0.005])

    def update_ai(self, game_state):
        if game_state.ball_position_y < game_state.right_paddle_y:
            self.move_right_paddle(game_state, -1)
        elif game_state.ball_position_y > game_state.right_paddle_y:
            self.move_right_paddle(game_state, 1)

    def move_right_paddle(self, game_state, direction):
        game_state.right_paddle_y += direction * 0.01
        game_state.right_paddle_y = max(0.05, min(0.95, game_state.right_paddle_y))

# View for creating a new game room
@csrf_exempt
def create_room(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            player2_is_ai = data.get("player2_is_ai", False)
            print("Checkpoint 1: Data Retrieved Successfully")
            room_name = 'room-' + str(random.randint(1000, 9999))
            game_state = GameState.objects.create(
                room_name=room_name,
                ball_position_x=0.5,
                ball_position_y=0.5,
                ball_speed_x=random.choice([0.005, -0.005]),
                ball_speed_y=random.choice([0.005, -0.005]),
                left_paddle_y=0.5,
                right_paddle_y=0.5,
                score_player1=0,
                score_player2=0,
                player1="Player1",
                player2="AI" if player2_is_ai else None
            )
            print("Checkpoint 2: GameState Object Created")
            serializer = GameStateSerializer(game_state)
            return JsonResponse({
                "message": "Room created successfully",
                "room_name": room_name,
                "game_state": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            }, status=500)
    else:
        print("am i here")
        return JsonResponse({"error": "is it coming from here ?"}, status=405)


# View for searching a room that is waiting for an opponent
class SearchRoomView(APIView):
    def get(self, request):
        waiting_room = GameState.objects.filter(player2=None).first()
        if waiting_room:
            waiting_room.player2 = "Player2"
            waiting_room.save()
            return Response({'room_name': waiting_room.room_name}, status=status.HTTP_200_OK)
        return Response({'room_name': None}, status=status.HTTP_404_NOT_FOUND)

class TestPostView(APIView):
    def post(self, request):
        print("Received data:", request.data)
        return Response({"message": "Data received"}, status=status.HTTP_200_OK)
