from rest_framework import status, generics
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.views import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from cryptography.fernet import Fernet
from django.conf import settings

cipher = Fernet(settings.SHARED_SECRET.encode())

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_user(request):
	username = request.data.get("username")
	encypted_password = request.data.get("password")

	if not username or not encypted_password:
		return Response(
			{"error": "Username and password are required."},
			status=status.HTTP_400_BAD_REQUEST
		)

	try:
		password = cipher.decrypt(encypted_password.encode()).decode()
	except Exception as e:
		return Response({"error": "Invalid ecnryption."}, status=status.HTTP_400_BAD_REQUEST)
	user = authenticate(username=username, password=password)
	if user:
		# fetch user info
		user_profile = user.profile
		nickname = user_profile.nickname
		return Response(
			{
				"user_id": user.id,
				"nickname": nickname,
				"message": "User verified",
			},
			status=status.HTTP_200_OK
		)
	return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserExistsView(View):
	def get(self, _, user_id):
		try:
			# check if exists
			User.objects.get(id=user_id)
			return JsonResponse({"exists": True}, status=200)
		except User.DoesNotExist:
			return JsonResponse({"exists": False}, status=404)
