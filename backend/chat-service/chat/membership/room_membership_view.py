from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chat.create_room.create_models import ChatRoom, RoomMembership

class RoomMembershipView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, room_id):
		try:
			room = ChatRoom.objects.get(id=room_id)
		except ChatRoom.DoesNotExist:
			return Response({"error": "Room does not exist."}, status=404)

		is_allowed = RoomMembership.objects.filter(user=request.user, room=room).exists()
		return Response({"is_allowed": is_allowed})
