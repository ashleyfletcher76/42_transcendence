import re
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializer import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

# logger = logging.getLogger(__name__)
User = get_user_model()

class UserRegisterView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):

		# check if user already exists
		username = request.data.get("username")
		if User.objects.filter(username=username).exists():
			return Response({"error": "A user with that username already exists."}, status=status.HTTP_400_BAD_REQUEST)

		# validate username format
		if not re.match(r'^[a-zA-Z0-9]*$', username):
			return Response(
				{"error": "Username must contain only letters and numbers."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(
				{"message": "User created successfully"},
				status=status.HTTP_201_CREATED,
			)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
