from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import MatchHistory
from ..utils import get_user_data

class MatchHistoryView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		"""
		Retrieve match history and statistics for the authenticated user.
		"""
		try:
			# Fetch user_id from authenticated user
			user_data = get_user_data(request)
			user_id = user_data["user_id"]

			# Retrieve match history and match details
			match_history = MatchHistory.objects.get(user_id=user_id)
			history = match_history.history.all().values("opponent", "result", "score", "date")

			response_data = {
				"trophies": match_history.trophies,
				"games_total": match_history.games_total,
				"wins": match_history.wins,
				"losses": match_history.losses,
				"history": list(history)
			}
			return Response(response_data, status=status.HTTP_200_OK)

		except MatchHistory.DoesNotExist:
			return Response(
				{"error": "No match history found for this user."},
				status=status.HTTP_404_NOT_FOUND,
			)
		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
