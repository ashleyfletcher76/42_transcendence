import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer
from django.http import JsonResponse
from django.db import connection

logger = logging.getLogger(__name__)

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

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)
