from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests
from .redis_views import TwoFAService

class LoginView(APIView):
	authentication_classes = []
	permission_classes = []

	def post(self, request):
		username = request.data.get("username")
		password = request.data.get("password")

		# send verification to user-service
		verification_url = "http://user-service:8000/users/verify/"
		response = requests.post(verification_url, json={"username": username, "password": password})

		print("Verification Status Code:", response.status_code)
		print("Verification Response JSON:", response.json())
		if response.status_code != 200:
			# failed verification
			print("Invalid credentials provided for username:", username)
			return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

		twofa_status_url = "http://user-service:8000/users/2fa-status/"
		twofa_response = requests.post(twofa_status_url, json={"username": username})

		print("Requesting 2FA status from user-service...")
		print("Request Data:", {"username": username})
		print("Response Status Code:", twofa_response.status_code)
		print("Response JSON:", twofa_response.json())


		if twofa_response.status_code == 500:
			return Response(
				{"error": "Server failure for 2FA checker."},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR,
			)
		elif twofa_response.status_code == 404:
			return Response(
				{"error": "User could not be found"},
				status=status.HTTP_404_NOT_FOUND,
			)
		elif twofa_response.status_code == 401:
			return Response(
				{"error": "Unauthorized request to user-service for 2FA status."},
				status=status.HTTP_401_UNAUTHORIZED,
			)

		# extract data
		twofa_data = twofa_response.json()
		if twofa_data["twofa_enabled"] == True:
			# generate and send code
			email = twofa_data["email"]
			twofa_code = TwoFAService.generate_2fa_code()
			TwoFAService.store_2fa_code(username, twofa_code, ttl=300)
			TwoFAService.send_2fa_code(email, twofa_code)

			# inform frontend to request the 2FA code
			return Response(
				{
					"two_fa_required": True,
					"message": "A 2FA code has been sent to your email."
				},
				status=status.HTTP_200_OK
			)

		# verifed, now extract
		user_data = response.json()
		user_id = user_data["user_id"]
		nickname = user_data["nickname"]

		refresh = RefreshToken()
		refresh["user_id"] = user_id
		refresh["nickname"] = nickname
		access_token = refresh.access_token

		# mark as online
		update_url = f"http://user-service:8000/users/update-profile/"
		update_response = requests.put(
			update_url,
			json={"nickname": nickname, "online_status": True},
			headers={"Authorization": f"Bearer {access_token}"}
		)

		if update_response.status_code != 200:
			print("Failed to update online status:", update_response.json())

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

class LogoutView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		print("[DEBUG] Logout triggered")
		try:
			# extrtact rhe refresh token from body
			refresh_token = request.data["refresh_token"]
			if not refresh_token:
				return Response(
					{"error": "Refresh token is required."},
					status=status.HTTP_400_BAD_REQUEST,
				)
			# print(f"Refresh token: {refresh_token}")
			# decode the refresh token
			token = RefreshToken(refresh_token)
			nickname = token.get("nickname")

			auth_header = request.headers.get("Authorization")
			if not auth_header or not auth_header.startswith("Bearer "):
				return Response(
					{"error": "Access token is missing from Authorization header."},
					status=status.HTTP_401_UNAUTHORIZED,
				)
			access_token = auth_header.split(" ")[1]

			# mark as offline
			update_url = f"http://user-service:8000/users/update-profile/"
			updated_response = requests.put(
				update_url,
				json={"nickname": nickname, "online_status": False},
				headers={"Authorization": f"Bearer {access_token}"}
			)

			if updated_response.status_code != 200:
				print("Failed to update online status:", updated_response.json())
				return Response(
					{"error": "Failed to update user status."},
					status=status.HTTP_500_INTERNAL_SERVER_ERROR,
				)

			token.blacklist()

			return Response(
				{"message": "Logged out successfully"},
				status=status.HTTP_205_RESET_CONTENT,
			)
		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
