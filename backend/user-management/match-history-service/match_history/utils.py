import requests
from rest_framework.response import Response
from rest_framework import status

def get_user_data(request):
	"""Fetch user details from user-service"""

	token = request.headers.get("Authorization")
	if not token or not token.startswith("Bearer "):
		raise ValueError("Authorization header missing or invalid")

	token = token.split(" ")[1]
	try:
		response = requests.get(
			f"http://user-service:8000/users/get-single-user-data/",
			headers={"Authorization": f"Bearer {token}"}
		)
		if response.status_code != 200:
			raise ValueError(f"User not found, status code: {response.status_code}")
		return response.json()
	except requests.RequestException as e:
		raise ConnectionError(f"Error connecting to user-service: {str(e)}")
