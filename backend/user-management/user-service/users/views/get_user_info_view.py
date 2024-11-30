from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_single_username(request, user_id):
	try:
		print(f"Recived request for user ID: {user_id}")
		user = User.objects.get(id=user_id)
		return JsonResponse({"user_id": user.id, "username": user.username})
	except User.DoesNotExist:
		print("Failure inside get user single")
		return JsonResponse({"error": "User not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usernames(request):
	try:
		user_ids = request.GET.getlist("user_ids")
		user_ids = [int(uid) for uid in user_ids]
		users = User.objects.filter(id__in=user_ids).values("id", "username")
		return JsonResponse({"users": list(users)})
	except ValueError:
		return JsonResponse({"error": "Invalid user ID's"}, status=400)
	except Exception as e:
		return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
	try:
		user = request.user
		profile = user.profile
		return JsonResponse(
			{
				"user_id": user.id,
				"username": user.username,
				"nickname": profile.nickname,
				"avatar": profile.avatar.url if profile.avatar else None,
				"bio": profile.bio,
			},
			status=200,
		)
	except User.DoesNotExist:
		return JsonResponse({"error": "User not found."}, status=404)
