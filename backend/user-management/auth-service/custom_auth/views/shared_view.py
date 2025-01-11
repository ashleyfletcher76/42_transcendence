import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

def generate_tokens_and_status(user_data):
	"""Generate the above items"""

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
