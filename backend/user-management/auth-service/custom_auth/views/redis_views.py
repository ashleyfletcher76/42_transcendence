import redis
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# init redis client
redis_client = redis.StrictRedis(
	host=settings.REDIS_HOST,
	port=settings.REDIS_PORT,
	db=settings.REDIS_DB,
	decode_responses=True,
)

def store_key(key, value, ttl=300):
	"""Store a key-value pair in Redis with a time to live"""
	redis_client.setex(key, ttl, value)

def get_key(key):
	"""Retrieves a vlue from Redis by key"""
	return redis_client.get(key)

def delete_key(key):
	"""Delete a key value pair from Redis"""
	redis_client.delete(key)

class TwoFAService:
	@staticmethod
	def generate_2fa_code(self):
		"""Generate a random 6-digit 2FA code"""
		import random
		return int(random.randint(100000, 999999))

	@staticmethod
	def send_2fa_code(self, email, code):
		"""Send the 2FA code to the user's email"""
		print("[DEBUG] Sending 2FA code to user's email")

	@staticmethod
	def store_2fa_code(username, code, ttl=300):
		"""Store the 2FA code in Redis"""
		key = f"2fa_code:{username}"
		store_key(key, code, ttl)

	@staticmethod
	def validate_2fa_code(username, code):
		"""Validate a 2FA code"""
		key = f"2fa_code:{username}"
		stored_code = get_key(key)
		if stored_code and stored_code == code:
			delete_key(key)
			return True
		return False

class ValidateTwoFAView(APIView):
	"""Validate the 2FA code"""
	authentication_classes = []
	permission_classes = []

	def post(self, request):
		username = request.data.get("username")
		code = request.data.get("code")

		if not username or not code:
			return Response(
				{"error": "Username and 2FA code are rquired."},
				status=status.HTTP_400_BAD_REQUEST,
			)

		# validate the 2FA code
		if TwoFAService.validate_2fa_code(username, code):
			return Response(
				{"message": "2FA verified successfully"},
				status=status.HTTP_200_OK
			)
		else:
			return Response(
				{"message": "2FA code is expired or invalid"},
				status=status.HTTP_400_BAD_REQUEST
			)
