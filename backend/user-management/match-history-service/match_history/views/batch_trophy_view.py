from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import MatchHistory

class BatchTrophiesView(APIView):
	def post(self, request):
		"""Retrieve trophy counts for multiple user IDs"""
		user_ids = request.data.get("user_ids", [])
		print(f"[DEBUG] Received user_ids: {user_ids}")

		if not user_ids or not isinstance(user_ids, list):
			return Response(
				{"error": "Invalid or missing user_ids"},
				status=status.HTTP_400_BAD_REQUEST
			)

		try:
			# fetch match history for provided user_ids
			match_histories = MatchHistory.objects.filter(user_id__in=user_ids).values("user_id", "trophies")
			trophies_map = {
				str(item["user_id"]): item["trophies"]
				for item in match_histories
			}
			if not trophies_map:
				return Response(
					{"error": "No match histories found for given user IDs."},
					status=status.HTTP_404_NOT_FOUND
				)
			print(f"[DEBUG] Trophies map generated: {trophies_map}")
			return Response(trophies_map, status=status.HTTP_200_OK)
		except Exception as e:
			print(f"[ERROR] Exception: {str(e)}")
			return Response(
				{"error": str(e)},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR
			)

