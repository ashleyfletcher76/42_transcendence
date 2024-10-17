from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer

class UserProfileView(APIView):
	def get(self, request):
		return Response({"message": "This is the user profile view"})

class UserRegisterView(APIView):
	def post(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
