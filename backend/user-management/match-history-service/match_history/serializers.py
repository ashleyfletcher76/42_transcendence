from rest_framework import serializers
from .models import MatchHistory, MatchDetail

class MatchDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = MatchDetail
		fields = ["opponent", "result", "score", "date"]

class MatchHistorySerializer(serializers.ModelSerializer):
	history = MatchDetailSerializer(many=True, read_only=True)

	class Meta:
		model = MatchHistory
		fields = ["trophies", "games_total", "wins", "losses", "history"]
