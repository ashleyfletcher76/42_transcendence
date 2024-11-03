from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GameState
from .serializers import GameStateSerializer
import random

class GameStateView(APIView):
    def get(self, request):
        game_state = GameState.objects.first() or GameState.objects.create()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data)

    def post(self, request):
        game_state = GameState.objects.first()
        if not game_state:
            game_state = GameState.objects.create()

        # Move the ball
        game_state.ball_x += game_state.ball_speed_x
        game_state.ball_y += game_state.ball_speed_y

        # Bounce off the top and bottom
        if game_state.ball_y <= 0 or game_state.ball_y >= 1:
            game_state.ball_speed_y = -game_state.ball_speed_y

        # Check for scoring
        if game_state.ball_x <= 0:
            game_state.right_score += 1
            game_state.ball_x = 0.5
            game_state.ball_y = 0.5
            game_state.ball_speed_x = random.choice([0.01, -0.01])
            game_state.ball_speed_y = random.choice([0.01, -0.01])
        elif game_state.ball_x >= 1:
            game_state.left_score += 1
            game_state.ball_x = 0.5
            game_state.ball_y = 0.5
            game_state.ball_speed_x = random.choice([0.01, -0.01])
            game_state.ball_speed_y = random.choice([0.01, -0.01])

        # Save the updated game state
        game_state.save()
        serializer = GameStateSerializer(game_state)
        return Response(serializer.data, status=status.HTTP_200_OK)