from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import requests

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
					print("Success here")
					return Response({"detail": "Token is valid", "user_id": user_id}, status=status.HTTP_200_OK)
				else:
					print("Else suer not found here")
					return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

			except (InvalidToken, TokenError) as e:
				print("inside except here")
				return Response({"detail": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)

		print("before auth header malformed")
		return Response({"detail": "Authorization header missing or malformed"}, status=status.HTTP_400_BAD_REQUEST)

class ValidateUserView(APIView):
	authentication_classes = []
	permission_classes = []

	def get(self, request, user_id):
		# query user service
		user_service_url = f"http://user-service:8001/exists/{user_id}/"

		try:
			response = request.get(user_service_url)
			if  response.status_code == 200:
				return Response({"detail": "User exists"}, status=status.HTTP_200_OK)
			elif response.status_code == 404:
				return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
			else:
				return Response(
					{"error": "Unexpected repsonse from user-service"},
					status=status.HTTP_502_BAD_GATEWAY,
				)
		except request.RequestException as e:
			return  Response(
				{"error": f"Failed to connect to user-service: {str(e)}"},
				status=status.HTTP_503_SERVICE_UNAVAILABLE,
			)
