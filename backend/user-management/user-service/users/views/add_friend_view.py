from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import UserProfile

class AddFriendView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		user = request.user.profile
		target_nickname = request.data.get("nickname")
		action_type = request.data.get("type")

		if not target_nickname or not action_type:
			return Response(
				{"error": "Both 'nickname' and 'type' are required."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		if action_type not in ["add", "remove"]:
			return Response(
				{"error": "Invalid type. Use 'add' or 'remove' only."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		try:
			target_user = UserProfile.objects.get(nickname=target_nickname)

			if user == target_user:
				return Response(
					{"error": "You cannot add or remove yourself as a friend."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# check if target user is blocked
			if target_user in user.blocked_users.all():
				return Response(
					{"error": "You cannot add a user you have blocked."},
					status=status.HTTP_400_BAD_REQUEST,
				)

			# add friend logic
			if action_type == "add":
				if target_user in user.friends.all():
					return Response(
						{"error": "User is already a friend."},
						status=status.HTTP_400_BAD_REQUEST,
					)
				user.friends.add(target_user)
				target_user.friends.add(user)
				return Response(
					{
						"success": True,
						"message": f"You are now friends with {target_user.nickname}."
					},
					status=status.HTTP_200_OK,
				)

			# remove friend logic
			if action_type == "remove":
				if target_user not in user.friends.all():
					return Response(
						{"error": "User is not in your friend list."},
						status=status.HTTP_400_BAD_REQUEST,
					)
				user.friends.remove(target_user)
				target_user.friends.remove(user)
				return Response(
					{
						"success": True,
						"message": f"{target_user.nickname} has been removed from your friend list."
					},
					status=status.HTTP_200_OK,
				)

		except UserProfile.DoesNotExist:
			return Response(
				{"error": "Target user not found."},
				status=status.HTTP_404_NOT_FOUND,
			)
