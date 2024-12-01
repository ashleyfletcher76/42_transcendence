from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import UserProfile

class BlockUserView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		target_username = request.data.get("target_username")
		if not target_username:
			return Response({"error": "Target username is required."}, status=status.HTTP_400_BAD_REQUEST)

		try:
			target_user = UserProfile.objects.get(nickname=target_username)
			user_profile = request.user.profile

			if target_user == user_profile:
				return Response(
					{"error": "You cannot block yourself."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# check if already blocked
			if target_user in user_profile.blocked_users.all():
				return Response(
					{"error": "User is already blocked."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# if target is a friend, we remove
			if target_user in user_profile.friends.all():
				user_profile.friends.remove(target_user)

			# block user
			user_profile.blocked_users.add(target_user)

			return Response(
				{"message": f"You have blocked {target_username}."},
				status=status.HTTP_200_OK,
			)

		except UserProfile.DoesNotExist:
			return Response(
				{"error": "Target user not found."},
				status=status.HTTP_404_NOT_FOUND,
			)

	### Create already blocked ###
	### Create block friend ###
