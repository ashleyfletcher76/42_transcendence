from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class TournamentActive(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		user_profile = request.user.profile

		# get game and tournament info from request
		game_name = request.data.get('game_name')
		tournament_name = request.data.get('tournament_name')
		action_type = request.data.get('action_type')

		# validate that action_type is present
		if not action_type:
			return Response(
				{"error": "'action_type' is required and must be either 'start' or 'end'."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		if action_type not in ["start", "end"]:
			return Response(
				{"error": "Invalid 'action_type'. Use 'start' or 'end'."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		# handle game start
		if action_type == "start":
			# check if game_active is already true
			if user_profile.game_active:
				return Response(
					{"error": "A game is already active. Please end current game and then retry."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# validate require fields
			if not game_name:
				return Response(
					{"error": "'game_name' is required when starting a game."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# set game_active, game_name and tournament_name
			user_profile.game_active = True
			user_profile.game_name = game_name
			user_profile.tournament_name = tournament_name
		else:
			# end current game and reset other fields to null
			user_profile.game_active = False
			user_profile.game_name = None
			user_profile.tournament_name = None

		user_profile.save()

		return Response(
			{
				"success": True,
				"message": f"Game state updated successfully: {action_type}"
			},
			status=status.HTTP_200_OK
		)
