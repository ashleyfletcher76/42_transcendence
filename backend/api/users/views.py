from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer, LoginSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

class UserRegisterView(APIView):
	def post(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
	def post(self, request):
		logout(request)
		return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
