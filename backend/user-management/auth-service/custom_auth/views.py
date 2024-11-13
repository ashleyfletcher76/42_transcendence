from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from django.db import connection
import requests
import logging

logger = logging.getLogger(__name__)

class ValidateTokenView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        print("Authorization header:", request.headers.get("Authorization"))
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1]
            jwt_auth = JWTAuthentication()

            try:
                # validate token
                validated_token = jwt_auth.get_validated_token(token)
                user_id = validated_token.get("user_id")
                print(f"Token user_id: {user_id}")

                # verify user with user-service
                verification_url = f"http://user-service:8000/users/exists/{user_id}/"
                response = requests.get(verification_url)
                if response.status_code == 200:
                    return Response({"detail": "Token is valid"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            except (InvalidToken, TokenError) as e:
                return Response({"detail": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"detail": "Authorization header missing or malformed"}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # send verification to user-service
        verification_url = "http://user-service:8000/users/verify/"
        response = requests.post(verification_url, json={"username": username, "password": password})

        print("Verification Status Code:", response.status_code)
        print("Verification Response JSON:", response.json())

        if response.status_code == 200:
            # verifed, now extract
            user_data = response.json()
            user_id = user_data["user_id"]

            refresh = RefreshToken()
            refresh["user_id"] = user_id
            access_token = refresh.access_token

            print("Tokens created for user_id:", user_id)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(access_token),
                    "user_id": user_id
				},
                status=status.HTTP_200_OK
			)
        else:
            # failed verification
            print("Invalid credentials provided for username:", username)
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

health_check_logged = False

def health_check(request):
    global health_check_logged
    try:
        connection.ensure_connection()
    except Exception as e:
        # Log only on failure
        logger.error(f"Health check failed: {e}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    if not health_check_logged:
        health_check_logged = True
        logger.info("Health check passed: Service is up and running.")
    return HttpResponse("ok", content_type="text/plain", status=200)
