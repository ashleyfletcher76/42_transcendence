import redis
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .shared_view import generate_tokens_and_status

# init redis client
redis_client = redis.StrictRedis(
	host=settings.REDIS_HOST,
	port=settings.REDIS_PORT,
	db=settings.REDIS_DB,
	decode_responses=True,
)

def store_key(key, value, ttl=600):
	"""Store a key-value pair in Redis with a time to live(ttl)"""
	try:
		redis_client.setex(key, ttl, value)
	except redis.RedisError as e:
		print(f"[ERROR] Failed to store key '{key}' in Redis: {e}")

def get_key(key):
	"""Retrieves a vlue from Redis by key"""
	return redis_client.get(key)

def delete_key(key):
	"""Delete a key value pair from Redis"""
	redis_client.delete(key)

class TwoFAService():
	@staticmethod
	def generate_2fa_code():
		"""Generate a random 6-digit 2FA code"""
		import random
		return int(random.randint(100000, 999999))

	@staticmethod
	def send_2fa_code(username, email, code):
		"""Send the 2FA code to the user's email using Gmail SMTP"""
		sender_email = settings.GMAIL_USER
		app_password = settings.GMAIL_APP_PASSWORD

		# create the email content
		subject = "Your 2FA Code"
		text_content = f"Your 2FA code is: {code}. It will expire in 5 minutes."
		html_content = f"<p>Your 2FA code is: <strong>{code}</strong>. It will expire in 5 minutes.</p>"

		# set up the MIME
		message = MIMEMultipart("alternative")
		message["Subject"] = subject
		message["From"] = sender_email
		message["To"] = email

		# attach the text and HTML content
		message.attach(MIMEText(text_content, "plain"))
		message.attach(MIMEText(html_content, "html"))

		try:
			# connect to Gmail SMTP server
			with smtplib.SMTP("smtp.gmail.com", 587) as server:
				server.starttls()  # upgrade connection to SSL/TLS
				server.login(sender_email, app_password)
				server.sendmail(sender_email, email, message.as_string())

			print(f"2FA email sent successfully to {email}")
		except Exception as e:
			print(f"[ERROR] Failed to send 2FA email: {e}")

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
	"""Validate the 2FA code and generate tokens"""
	authentication_classes = []
	permission_classes = []

	def post(self, request):
		username = request.data.get("username")
		code = request.data.get("code")

		if not username or not code:
			return Response(
				{"error": "Username and 2FA code are required."},
				status=status.HTTP_400_BAD_REQUEST
			)

		# validate the 2FA code
		if not TwoFAService.validate_2fa_code(username, code):
			return Response(
				{"error": "Invalid or expired 2FA code."},
				status=status.HTTP_400_BAD_REQUEST
			)

		# retrieve user data from user-service
		user_data_url = f"http://user-service:8000/users/get-data-without-token/?username={username}"
		user_response = requests.get(user_data_url)

		if user_response.status_code != 200:
			return Response(
				{"error": "Failed to retrieve user data"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR
			)

		user_data = user_response.json()

		# generate tokens and update status
		tokens = generate_tokens_and_status(user_data)
		return tokens

