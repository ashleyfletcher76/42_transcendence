from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random


SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
FPS = 60

class GameStateView(APIView):
    def get(self, request):
        game_state = GameState.objects.first() or GameState.objects.create()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data)

    def post(self, request):
        game_state = GameState.objects.first()
        if not game_state:
            game_state = GameState.objects.create()

        if game_state.ball_y <= 0 or game_state.ball_y >= 1:
            game_state.ball_speed_y = -game_state.ball_speed_y
            
        if game_state.ball_x <= 0.08:  # Left paddle
            if game_state.left_paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= game_state.ball_y <= game_state.left_paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                game_state.ball_speed_x = -game_state.ball_speed_x  # Bounce back
                game_state.ball_x = 0.08  # Prevent the ball from getting stuck in the paddle

        if game_state.ball_x >= 0.92:  # Right paddle
            if game_state.right_paddle_y - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= game_state.ball_y <= game_state.right_paddle_y + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                game_state.ball_speed_x = -game_state.ball_speed_x  # Bounce back
                game_state.ball_x = 0.92  # Prevent the ball from getting stuck in the paddle

        if game_state.ball_x <= 0:
            game_state.right_score += 1
            game_state.reset_ball()
        elif game_state.ball_x >= 1:
            game_state.left_score += 1
            game_state.reset_ball()

        def reset_ball(game_state):
            game_state.ball_x = 0.5
            game_state.ball_y = 0.5
            game_state.ball_speed_x = random.choice([0.005, -0.005])
            game_state.ball_speed_y = random.choice([0.005, -0.005])

        def move_left_paddle(game_state, direction):
            game_state.left_paddle_y += direction * 0.01
            # Keep paddle within bounds
            game_state.left_paddle_y = max(0, min(1, game_state.left_paddle_y))

        def move_right_paddle(game_state, direction):
            game_state.right_paddle_y += direction * 0.01
            # Keep paddle within bounds
            game_state.right_paddle_y = max(0, min(1, self.right_paddle_y))


        # Save the updated game state
        game_state.save()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data, status=status.HTTP_200_OK)