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
			user = request.user
			if user.is_authenticated:
				print(f"[DEBUG] Authenticated user: {user.username} (ID: {user.id})")
				user_id = user.id
			else:
				raise ValueError("User is not authenticated.")

			# Extract payload
			data = request.data
			print(f"[DEBUG] Payload received: {data}")
			opponent = data.get("opponent")
			result = data.get("result")
			score = data.get("score")
			tournament = data.get("tournament", False)

			# Validate payload
			if not all([opponent, result, score]):
				print("[DEBUG] Missing required fields")
				return Response(
					{"error": "Missing required fields: 'opponent', 'result', or 'score'."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# Get or create the user's match history
			print("[DEBUG] Fetching or creating MatchHistory")
			match_history, created = MatchHistory.objects.get_or_create(user_id=user_id)
			print(f"[DEBUG] MatchHistory fetched or created: {match_history}, created: {created}")

			# Create MatchDetail
			print("[DEBUG] Creating MatchDetail")
			MatchDetail.objects.create(
				match_history=match_history,
				opponent=opponent,
				result=result,
				score=score,
			)
			print("[DEBUG] MatchDetail created successfully")

			# Update aggregate statistics
			print("[DEBUG] Updating aggregate statistics")
			match_history.games_total += 1
			if result.lower() == "win":
				match_history.wins += 1
				if tournament:
					match_history.trophies += 1
			elif result.lower() == "loss":
				match_history.losses += 1
			match_history.save()
			print("[DEBUG] MatchHistory updated and saved")

			return Response({"message": "Match detail added and statistics updated successfully."}, status=status.HTTP_201_CREATED)

		except Exception as e:
			print(f"[ERROR] Exception occurred: {e}")
			return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
