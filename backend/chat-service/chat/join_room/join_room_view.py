from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chat.create_room.create_models import ChatRoom

class JoinRoomView(APIView):
	permission_classes = [IsAuthenticated]

	def post(Self, request):
		room_id = request.data.get("room_id")

		if not room_id:
			return Response({"error": "Room ID is required"}, status=400)

		try:
			room = ChatRoom.objects.get(id=room_id)
		except ChatRoom.DoesNotExist:
			return Response({"error": "Room does not exist."}, status=404)

		# check if user is allowed to join
		if not room.is_user_allowed(request.user):
			return Response({"error": "You are not allowed to join this room."}, status=403)

		return Response({
			"id": room.id,
			"name": room.name,
			"type": room.room_type,
			"creator": room.creator.username,
			"invited_users": [user.username for user in room.invited_users.all()],
		}, status=200)
