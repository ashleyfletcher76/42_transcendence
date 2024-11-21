import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializer import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)
User = get_user_model()

class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info("Incoming registration data: %s", request.data)

        # Check if user already exists
        username = request.data.get("username")
        if User.objects.filter(username=username).exists():
            logger.error("Registration failed: Username already exists")
            return Response({"error": "A user with that username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info("User created successfully: %s", serializer.data)
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )

        logger.error("Registration failed: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
