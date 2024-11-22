from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chat.create_room.create_models import ChatRoom
import requests

class InviteUsers(APIView):
	authentication_classes = []
	permission_classes = []

	def post(self, request):
		room_id = request.data.get("room_id")
		invited_user_ids = request.data.get("invited_user_ids", [])

		if not room_id:
			return Response ({"error": "Room ID is required"}, status=400)

		if not invited_user_ids:
			return Response({"error": "At least one user ID is required"}, status=400)

		try:
			# retrieve the room from the database
			room = ChatRoom.objects.get(id=room_id)
		except ChatRoom.DoesNotExist:
			return Response({"error": "Room does not exist"}, status=404)

		# check if creator has invited user
		if request.user.id != room.created_id:
			return Response({"error": "You do not have permission to invite to this group"}, status=403)

		# validate the invited users
		auth_header = request.headers.get("Authorization")
		invited_user_url = f"http://user-service:8000/users/get-usernames/"
		try:
			response = requests.get(
				invited_user_url,
				headers={"Authorization": auth_header},
				params={"user_ids": invited_user_ids},
			)
			response.raise_for_status()
			valid_users = response.json().get("users", [])
		except requests.RequestException as e:
			return Response(
				{"error": f"User-service connection failed: {str(e)}"},
				status=503,
			)

		if not valid_users:
			return Response({"error": "No valid user found to invite"}, status=400)

		# extract valid user ID's
		valid_users_ids = [user["id"] for user in valid_users]

		# update the invited users list inside the room
		current_invited_users = room.invited_users
		updated_invited_users = list(set(current_invited_users + valid_users_ids))
		room.invited_users = updated_invited_users
		room.save()

		return Response(
			{
				"message": "Users successfully invited",
				"room_id": room.id,
				"invited_users": updated_invited_users,
			},
			status=200,
		)
