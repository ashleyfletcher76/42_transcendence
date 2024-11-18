from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .create_models import ChatRoom
from django.contrib.auth.models import User

class CreateRoomView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		room_name = request.data.get("name")
		room_type = request.data.get("type", "private")
		invited_ids = request.data.get("invited_users", [])

		if not room_name:
			return Response({"error": "Room name is required"}, status=400)

		if ChatRoom.objects.filter(name=room_name).exists():
			return Response({"error": "Room name already exists."}, status=400)

		# create room
		room = ChatRoom.objects.create(name=room_name, creator=request.user, room_type=room_type)

		# invite users
		invited_users = User.objects.filter(id__in=invited_ids)
		room.invited_users.add(*invited_users)
		room.invited_users.add(request.user) ## creator is also included in the list of users

		return Response({
			"id": room.id,
			"name": room.name,
			"type": room.room_type,
			"creator": request.user.username,
			"invited_users": [user.username for user in invited_users]
		}, status=201)
