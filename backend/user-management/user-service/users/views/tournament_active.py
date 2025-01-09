from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# from ..models import UserProfile
from ..serializer import UserProfileSerializer

class TournamentActive(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		user_profile = request.user.profile

		# get game and tournament info from request
		game_name = request.data.get('game_name')
		tournament_name = request.data.get('tournament_name')
		action_type = request.data.get('action_type')

		if not game_name and not action_type:
			return Response(
				{"error": "At least 'game_name' and 'action_type' must be provided."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		if action_type not in ["start", "end"]:
			return Response(
				{"error": "Invalid 'action_type'. Use 'start' or 'end'."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		# handle game start or end
		if action_type == "start":
			user_profile.game_active = True
			user_profile.game_name = game_name
			user_profile.tournament_name = tournament_name
		else:
			user_profile.game_active = False
			user_profile.game_name = None
			user_profile.tournament_name = None

		user_profile.save()

		# serialize and return update profile
		# serializer = UserProfileSerializer(user_profile)
		# return Response(serializer.data, status=status.HTTP_200_OK)

		return Response(
			{
				"success": True,
				"message": f"Game state updated successfully: {action_type}"
			},
			status=status.HTTP_200_OK
		)
