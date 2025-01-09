from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializer import UserSerializer
from rest_framework.permissions import AllowAny

class UserRegisterView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(
				{"message": "User created successfully"},
				status=status.HTTP_201_CREATED,
			)
		print("[DEBUG] Registration failed:", serializer.errors)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
