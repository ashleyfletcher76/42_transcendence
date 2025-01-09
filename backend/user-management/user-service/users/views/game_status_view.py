from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_game_status(request):
	"""Check if a game is active for user"""
	user = request.user
	profile = user.profile

	if profile.game_active:
		return Response(
			{
				"success": True,
				"message": "User has a game active."
			},
			status=200,
		)
	return Response(
		{
			"success": False,
			"message": "User does not have an active game."
		},
		status=200,
	)
