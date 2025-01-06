from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError, AuthenticationFailed
import requests

class BaseTokenView(APIView):
	"""Base class to handle common token operations"""
	authentication_classes = []
	permission_classes = []

	def validate_token(self, token):
		"""Vlaidate a JWT token and return its payload"""
		try:
			jwt_auth = JWTAuthentication()
			# validate token
			validated_token = jwt_auth.get_validated_token(token)
			return validated_token
		except (InvalidToken, TokenError) as e:
			# raise an error if token is invalid or expired
			raise AuthenticationFailed(f"Invalid or expired token: {str(e)}")

	def call_user_service(self, endpoint, headers=None):
		"""Send a request to the user-service and return the reponse"""
		try:
			response = requests.get(endpoint, headers=headers)
			response.raise_for_status()
			return response
		except requests.exceptions.RequestException as e:
			# handle cases where user-service is unreachable
			raise Exception(f"User-service unavailable: {str(e)}")

#################################################################
## This view validates a JWT token and ensures the user exists ##
#################################################################
class ValidateTokenView(BaseTokenView):
	"""View to validate a token and check a users existence"""

	def post(self, request):
		# extract the auth header from incoming requests
		# print("Authorization header:", request.headers.get("Authorization"))
		auth_header = request.headers.get("Authorization")

		# check if the auth header contains a token
		if not (auth_header and auth_header.startswith("Bearer ")):
			return Response(
				{"error": "Authorization header missing or malformed"},
				status=status.HTTP_400_BAD_REQUEST)

		token = auth_header.split("Bearer ")[1]
		try:
			# validate token
			validated_token = self.validate_token(token)
			user_id = validated_token.get("user_id")
			if not user_id:
				return Response({"error": "Token is missing user_id"}, status=status.HTTP_400_BAD_REQUEST)
			print(f"Token user_id: {user_id}")
			# verify user with user-service
			verification_url = f"http://user-service:8000/users/exists/{user_id}/"
			response = self.call_user_service(verification_url)
			# check if the response from the user-service indicates success
			if response.status_code == 200:
				return Response({"detail": "Token is valid", "user_id": user_id}, status=status.HTTP_200_OK)
			else:
				return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
		except AuthenticationFailed as e:
			return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
		except Exception as e:
			return Response({"error": "Service error occurred"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)


#############################################################
## This view retrieves user details based on a valid token ##
#############################################################

class GetUserFromTokenView(BaseTokenView):
	"""View to get user details from a token."""
	def post(self, request):
		token = request.data.get("token")
		if not token:
			return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			validated_token = self.validate_token(token)
			user_id = validated_token.get("user_id")
			if not user_id:
				return Response({"error": "Token missing user_id"}, status=status.HTTP_400_BAD_REQUEST)

			user_data_url = f"http://user-service:8000/users/get-single-user-data/{user_id}/"
			headers = {"Authorization": f"Bearer {token}"}
			response = self.call_user_service(user_data_url, headers=headers)

			try:
				user_data = response.json()
			except ValueError:
				return Response({"error": "Malformed response from user-service"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

			return Response(user_data, status=status.HTTP_200_OK)
		except AuthenticationFailed as e:
			return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
		except Exception as e:
			return Response({"error": "Service error occurred"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
