from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random
import math
from django.http import JsonResponse, HttpResponse
from django.db import connection
import logging

logger = logging.getLogger(__name__)

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100

class GameStateView(APIView):
    def get(self, request):
        game_state = GameState.objects.first() or GameState.objects.create()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data)

    def post(self, request):
        game_state = GameState.objects.first()
        # Move the ball
        game_state.ball_x += game_state.ball_speed_x
        game_state.ball_y += game_state.ball_speed_y

        # Bounce off the top and bottom
        if game_state.ball_y <= 0 or game_state.ball_y >= 1:
            game_state.ball_speed_y = -game_state.ball_speed_y

        if game_state.ball_x <= 0.08:  # Left paddle
            if game_state.left_paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= game_state.ball_y <= game_state.left_paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                self.handle_paddle_hit(game_state, "left")

        if game_state.ball_x >= 0.92:  # Right paddle
            if game_state.right_paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= game_state.ball_y <= game_state.right_paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                self.handle_paddle_hit(game_state, "right")  # Prevent the ball from getting stuck in the paddle

        # Check for scoring
        if game_state.ball_x <= 0:
            game_state.right_score += 1
            self.reset_ball(game_state)
        elif game_state.ball_x >= 1:
            game_state.left_score += 1
            self.reset_ball(game_state)

        # Save the updated game state
        game_state.save()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def handle_paddle_hit(self, game_state, paddle_side):
        # Calculate hit position relative to the paddle's center
        if paddle_side == "left":
            paddle_center = game_state.left_paddle_y * SCREEN_HEIGHT
            hit_position = paddle_center - (game_state.ball_y * SCREEN_HEIGHT)

            # Calculate angle based on hit position
            angle_factor = hit_position / (PADDLE_HEIGHT / 2)  # Normalize to [-1, 1]
            angle = angle_factor * (math.pi / 3)  # Max angle of 60 degrees

            game_state.ball_speed_x = -game_state.ball_speed_x  # Reverse X direction
            game_state.ball_speed_y = math.sin(angle) * 0.005  # Set new Y speed based on angle

        elif paddle_side == "right":
            paddle_center = game_state.right_paddle_y * SCREEN_HEIGHT
            hit_position = paddle_center - (game_state.ball_y * SCREEN_HEIGHT)

            # Calculate angle based on hit position
            angle_factor = hit_position / (PADDLE_HEIGHT / 2)  # Normalize to [-1, 1]
            angle = angle_factor * (math.pi / 3)  # Max angle of 60 degrees

            game_state.ball_speed_x = -game_state.ball_speed_x  # Reverse X direction
            game_state.ball_speed_y = math.sin(angle) * 0.005  # Set new Y speed based on angle

        # Increase ball speed (acceleration)
        game_state.ball_speed_x *= 1.1  # Increase X speed
        game_state.ball_speed_y *= 1.1  # Increase Y speed

    def reset_ball(self, game_state):
        game_state.ball_x = 0.5
        game_state.ball_y = 0.5
        game_state.ball_speed_x = random.choice([0.005, -0.005])
        game_state.ball_speed_y = random.choice([0.005, -0.005])

    def move_left_paddle(self, game_state, direction):
        game_state.left_paddle_y += direction * 0.01
        # Keep paddle within bounds
        game_state.left_paddle_y = max(0.10, min(0.90, game_state.left_paddle_y))

    def move_right_paddle(self, game_state, direction):
        game_state.right_paddle_y += direction * 0.01
        # Keep paddle within bounds
        game_state.right_paddle_y = max(0.10, min(0.90, game_state.right_paddle_y))

    def update_ai(self, game_state):
        # Simple AI to follow the ball
        if game_state.ball_y < game_state.right_paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
            game_state.move_right_paddle(-1)
        elif game_state.ball_y > game_state.right_paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
            game_state.move_right_paddle(1)

        game_state.save()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data, status=status.HTTP_200_OK)



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
