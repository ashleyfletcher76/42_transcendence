from rest_framework.views import APIView
from rest_framework.response import Response
from .create_models import ChatRoom, RoomMembership
from rest_framework.permissions import IsAuthenticated

class CreateRoomView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		# extract user details
		user_id = request.user.id
		username = getattr(request.user, "username", None)
		# print(f"Authenticated user ID: {user_id}")
		# print(f"Authenticated username: {username}")

		# extract room data
		name = request.data.get("name")
		room_type = request.data.get("type", "group")

		# print(f"Requested room type: {room_type}")

		if not name:
			return Response({"error": "Room name is required"}, status=400)

		if ChatRoom.objects.filter(name=name).exists():
			return Response({"error": "Room name already exists"}, status=400)

		# create the chat room
		room = ChatRoom.objects.create(
			name=name,
			room_type=room_type,
			created_by_user_id=user_id,
			created_by_username=username,
		)

		return Response(
			{
				"room_id": room.id,
				"name": room.name,
				"room_type": room.room_type,
			},
			status=201,
		)
