import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth import authenticate, get_user_model
from django.views import View
from rest_framework.decorators import api_view

logger = logging.getLogger(__name__)
User = get_user_model()

class UserRegisterView(APIView):
    def post(self, request):
        # log incoming request
        logger.info("Incoming registration data: %s", request.data)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info("User created successfully: %s", serializer.data)
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )

        # log errors
        logger.error("Registration failed: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        return Response({"user_id": user.id, "message": "User verified"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserExistsView(View):
    def get(self, request, user_id):
        try:
            # check if exists
            user = User.objects.get(id=user_id)
            return JsonResponse({"exists": True}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"exists": False}, status=404)

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)
