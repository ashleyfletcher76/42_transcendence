from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import requests
import logging

logger = logging.getLogger(__name__)

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
			nickname = user_data["nickname"]

			refresh = RefreshToken()
			refresh["user_id"] = user_id
			refresh["nickname"] = nickname
			access_token = refresh.access_token

			print("Tokens created for user_id:", user_id)
			return Response(
				{
					"refresh": str(refresh),
					"access": str(access_token),
					"user_id": user_id,
					"nickname": nickname
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


