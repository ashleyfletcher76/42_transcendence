from rest_framework.views import APIView
from rest_framework.response import Response
from .create_models import ChatRoom, RoomMembership
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
import requests

class CreateRoomView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        # Extract the user_id from the authenticated user
        user_id = request.user.id
        print(f"Authenticated user ID: {user_id}")

        # Fetch additional user details from the user-service
        response = requests.get(
            f"http://user-service:8000/get-single-username/{user_id}/",
            headers={"Authorization": request.headers.get("Authorization")}
        )

        if response.status_code != 200:
            return Response({"error": "Failed to fetch user information"}, status=response.status_code)

        user_data = response.json()
        username = user_data.get("username")
        print(f"Fetched username: {username}")

        # Use fetched username for room creation
        name = request.data.get("name")
        room_type = request.data.get("type", "group")

        if not name:
            return Response({"error": "Room name is required"}, status=400)

        if ChatRoom.objects.filter(name=name).exists():
            return Response({"error": "Room name already exists"}, status=400)

        room = ChatRoom.objects.create(name=name, type=room_type, created_by=request.user)
        RoomMembership.objects.create(user=request.user, room=room, role="admin")

        return Response({
            "room_id": room.id,
            "name": room.name,
            "type": room.type
        })
































# class CreateRoomView(APIView):
# 	authentication_classes = []
# 	permission_classes = []

# 	def post(self, request):
# 		# validate token using auth-service
# 		auth_header = request.headers.get("Authorization")
# 		validation_url = "http://auth-service:8000/auth/validate-token/"

# 		try:
# 			response = requests.post(validation_url, headers={"Authorization": auth_header})
# 			response.raise_for_status()
# 		except requests.RequestException as e:
# 			print("Before error auth service connection")
# 			return Response({"error": f"Auth-service connection failed: {str(e)}"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

# 		# extract user_id and fetch username from user-service
# 		user_id = response.json().get("user_id")
# 		print("Extracted user_id:", user_id)
# 		user_service_url = f"http://user-service:8000/users/get-single-username/{user_id}/"
# 		try:
# 			user_response = requests.get(user_service_url, headers={"Authorization": auth_header})
# 			user_response.raise_for_status()
# 		except requests.RequestException as e:
# 			print("inside the execept for CreateRoomView")
# 			return Response({"error": f"User-service connection failed: {str(e)}"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

# 		user_info = user_response.json()
# 		username = user_info.get("username")

# 		# room creation
# 		room_name = request.data.get("name")
# 		room_type = request.data.get("type", "private")
# 		invited_ids = request.data.get("invited_users", [])

# 		if not room_name:
# 			return Response({"error": "Room name is required"}, status=status.HTTP_400_BAD_REQUEST)

# 		if ChatRoom.objects.filter(name=room_name).exists():
# 			return Response({"error": "Room name already exists."}, status=status.HTTP_409_CONFLICT)

# 		# save creator_id and username in the database
# 		room = ChatRoom.objects.create(
# 			name=room_name, creator_id=user_id, creator_username=username, room_type=room_type
# 			)

# 		# validate invited users
# 		valid_invited_users = []
# 		for invited_id in invited_ids:
# 			invited_user_url = f"http://user-service:8000/users/get-usernames/"
# 			try:
# 				invited_response = requests.get(invited_user_url, headers={"Authorization": auth_header}, params={"user_ids": invited_ids})
# 				invited_response.raise_for_status()
# 				valid_invited_users = invited_response.json().get("users", [])
# 			except requests.RequestException as e:
# 				return Response(
# 					{"error": f"Failed to validate invited user {invited_id}: {str(e)}"},
# 					status=status.HTTP_400_BAD_REQUEST,
# 				)

# 		# return response
# 		return Response(
# 			{
# 				"id": room.id,
# 				"name": room.name,
# 				"type": room.room_type,
# 				"creator": {"id": user_id, "username": username},
# 				"invited_users": valid_invited_users,
# 			},
# 			status=status.HTTP_201_CREATED,
# 		)
