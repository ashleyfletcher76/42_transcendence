from django.http import JsonResponse
from django.contrib.auth import get_user_model

User = get_user_model()

def get_user_info(request, user_id):
	try:
		user = User.objects.get(id=user_id)
		return JsonResponse({"user_id": user.id, "username": user.username})
	except User.DoesNotExist:
		return JsonResponse({"error": "User not found"}, status=404)
