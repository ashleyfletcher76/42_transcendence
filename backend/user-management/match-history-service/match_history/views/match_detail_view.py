from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import MatchHistory, MatchDetail
from ..serializers import MatchDetailSerializer
from ..utils import get_user_data

class MatchDetailView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		"""Add a match detail and update aggregate match statistics."""
		try:
			# Fetch user_id from authenticated user
			user_data = get_user_data(request)
			user_id = user_data["user_id"]

			# Extract payload
			data = request.data
			opponent = data.get("opponent")
			result = data.get("result")
			score = data.get("score")
			tournament_win = data.get("tournament_win", False)

			# Validate payload
			if not all([opponent, result, score]):
				return Response(
					{"error": "Missing required fields: 'opponent', 'result', or 'score'."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# Get or create the user's match history
			match_history, _ = MatchHistory.objects.get_or_create(user_id=user_id)

			# Create MatchDetail
			MatchDetail.objects.create(
				match_history=match_history,
				opponent=opponent,
				result=result,
				score=score,
			)

			# Update aggregate statistics
			match_history.games_total += 1
			if result.lower() == "win":
				match_history.wins += 1
				if tournament_win:
					match_history.trophies += 1
			elif result.lower() == "loss":
				match_history.losses += 1
			match_history.save()

			return Response({"message": "Match detail added and statistics updated successfully."}, status=status.HTTP_201_CREATED)

		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
