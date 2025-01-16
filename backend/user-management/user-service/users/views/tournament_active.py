from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class TournamentActive(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		user_profile = request.user.profile

		# extract game and tournament info from request
		game_name = request.data.get('game_name')
		tournament_name = request.data.get('tournament_name')
		action_type = request.data.get('action_type')

		# print(f"-------- Action_type: {action_type} -----------")

		# validate action_type
		if action_type not in ["start", "end_game", "end_tournament"]:
			return Response(
				{"error": "'action_type' must be 'start', 'end_game', or 'end_tournament'."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		# handle actions
		if action_type == "start":
			if tournament_name:
				if user_profile.tournament_active:
					return Response(
						{"error": "A tournament is already active. Please end the current tournament before starting a new one."},
						status=status.HTTP_400_BAD_REQUEST,
					)
				user_profile.tournament_active = True
				user_profile.tournament_name = tournament_name
			if game_name:
				if user_profile.game_active:
					return Response(
						{"error": "A game is already active. Please end the current game before starting a new one."},
						status=status.HTTP_400_BAD_REQUEST,
					)
				user_profile.game_active = True
				user_profile.game_name = game_name
			if not game_name and not tournament_name:
				return Response(
					{"error": "'game_name' or 'tournament_name' must be provided when starting."},
					status=status.HTTP_400_BAD_REQUEST,
				)
		elif action_type == "end_game":
			if not user_profile.game_active:
				return Response(
					{"error": "No active game to end."},
					status=status.HTTP_400_BAD_REQUEST,
				)
			user_profile.game_active = False
			user_profile.game_name = None
		elif action_type == "end_tournament":
			if not user_profile.tournament_active:
				return Response(
					{"error": "No active tournament to end."},
					status=status.HTTP_400_BAD_REQUEST,
				)
			user_profile.tournament_active = False
			user_profile.tournament_name = None

		print("------------")
		print(f"for user {user_profile.nickname} tournament name = {user_profile.tournament_name} and game name = {user_profile.game_name}")
		print("------------")
		# save updates
		user_profile.save()

		# return success response
		return Response(
			{
				"success": True,
				"message": f"{action_type.replace('_', ' ').capitalize()} completed successfully."
			},
			status=status.HTTP_200_OK,
		)
