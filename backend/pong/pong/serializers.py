from rest_framework import serializers
from .models import GameState


class GameStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameState
        fields = '__all__'
