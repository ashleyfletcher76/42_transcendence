from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import UserProfile

class BlockUserView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		user_profile = request.user.profile
		target_nickname = request.data.get("nickname")
		action_type = request.data.get("type")

		if not target_nickname or not action_type:
			return Response(
				{"error": "Both 'nickname' and 'type' are required."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		if action_type not in ["add", "remove"]:
			return Response(
				{"error": "Invalid type. Use 'add' to block or 'remove' to unblock."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		try:
			target_user = UserProfile.objects.get(nickname=target_nickname)

			if user_profile == target_user:
				return Response(
					{"error": "You cannot block or unblock yourself."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			if action_type == "add":
				# check if already blocked
				if target_user in user_profile.blocked_users.all():
					return Response(
						{"error": f"{target_nickname} is already blocked."},
						status=status.HTTP_400_BAD_REQUEST,
					)

				# remove from friends if they are a friend
				if target_user in user_profile.friends.all():
					user_profile.friends.remove(target_user)

				# block the user
				user_profile.blocked_users.add(target_user)
				return Response(
					{
						"success": True,
						"message": f"{target_nickname} has been added to your blocklist."
					},
					status=status.HTTP_200_OK,
				)

			if action_type == "remove":
				# check if not in blocked list
				if target_user not in user_profile.blocked_users.all():
					return Response(
						{"error": f"{target_nickname} is not in your blocklist."},
						status=status.HTTP_400_BAD_REQUEST,
					)

				# remove from blocked list
				user_profile.blocked_users.remove(target_user)
				return Response(
					{
						"success": True,
						"message": f"{target_nickname} has been removed from your blocklist."
					},
					status=status.HTTP_200_OK,
				)

		except UserProfile.DoesNotExist:
			return Response(
				{"error": "Target user not found."},
				status=status.HTTP_404_NOT_FOUND,
			)
