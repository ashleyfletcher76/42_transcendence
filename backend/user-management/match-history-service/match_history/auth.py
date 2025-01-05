import requests
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import AnonymousUser

class ProxyUser():
	def __init__(self, user_id, username):
		self.id = user_id
		self.username = username

	@property
	def is_authenticated(self):
		return True

class CustomJWTAuthentication(JWTAuthentication):
	def authenticate(self, request):
		header = self.get_header(request)
		if header is None:
			print("No Authorization header found")
			return None

		raw_token = self.get_raw_token(header)
		if raw_token is None:
			print("No token found in header")
			return None

		print("JWT Authentication initiated")
		# validate the token and get user details
		user_data = self.get_user_from_auth_service(raw_token)
		user = ProxyUser(user_id=user_data["user_id"], username=user_data["username"])
		# print(f"Authenticated user: {user.username} (ID: {user.id})")
		return user, raw_token

	def get_user_from_auth_service(self, token):

		if isinstance(token, bytes):
			token = token.decode("utf-8")

		try:
			response = requests.post(
				f"http://auth-service:8000/auth/get-user-token/",
				json={"token": token}
			)
			# print(f"Auth-service response status: {response.status_code}")
			# print(f"Auth-service response body: {response.json()}")
			if response.status_code == 200:
				return response.json()
			else:
				raise AuthenticationFailed("User authentication failed")
		except requests.RequestException as e:
			raise AuthenticationFailed(f"Auth-service unreachable: {str(e)}")
