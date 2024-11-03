from rest_framework import serializers
from .models import GameState


class GameStateSerializer(serializers.ModelSerializer):
	class Meta:
		model = GameState
		fields = [
            'ball_x', 'ball_y', 
            'ball_speed_x', 'ball_speed_y',
            'left_paddle_y', 'right_paddle_y',
            'left_score', 'right_score'
        ]