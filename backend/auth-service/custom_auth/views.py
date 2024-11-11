from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth import get_user_model
import requests

User = get_user_model()

class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.data.get("token")
        jwt_auth = JWTAuthentication()
        try:
            # Authenticate the token
            validated_token = jwt_auth.get_validated_token(token)
            # If token is valid, return success response
            return Response({"detail": "Token is valid"}, status=status.HTTP_200_OK)
        except (InvalidToken, TokenError) as e:
            # If token is invalid, return error response
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # send verification to user-service
        verification_url = "http://user-service:9443/users/verify-user/"
        response = requests.post(verification_url, json={"username": username, "password": password})

        if response.status_code == 200:
            # verifed, now extract
            user_data = response.json()
            user_id = user_data["user_id"]

            try:
                user = User.objects.get(id=user_id)
                refresh = RefreshToken.for_user(user)
                return Response(
                        {"refresh": str(refresh), "access": str(refresh.access_token), "user_id": user_id},
                    status=status.HTTP_200_OK
                )
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        else:
            # failed
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)
