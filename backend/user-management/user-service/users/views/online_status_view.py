from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import UserProfile

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_online_status(request):
	try:
		user = request.user
		profile = user.profile

		online_status = request.data.get("online_status")

		if online_status is None:
			return Response(
				{"success": False, "message": "online_status is required."},
				status=400
			)

		if isinstance(online_status, str):
			online_status = online_status.lower() in ("true", "1")

		if not isinstance(online_status, bool):
			return Response(
				{"success": False, "message": "online_status must be a boolean value."},
				status=400
			)

		# update the online status
		profile.online = online_status
		profile.save()

		# respond with success
		return Response(
			{
				"success": True,
				"message": f"Online status updated to {'online' if online_status else 'offline'}."
			},
			status=200,
		)
	except Exception as e:
		# catch any unexpected errors
		print(f"[ERROR] Failed to update online status: {e}")
		return Response(
			{"success": False, "message": "An error occurred while updating online status."},
			status=500,
		)
