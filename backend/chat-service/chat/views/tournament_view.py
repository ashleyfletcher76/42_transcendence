from django.http import JsonResponse
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.views.decorators.csrf import csrf_exempt
import json, requests

@csrf_exempt
def create_tournament_chat(request):
	# extract token from header
	auth_header = request.headers.get("Authorization")
	if not auth_header or not auth_header.startswith("Bearer "):
		return JsonResponse({"error": "Authorization token is missing or invalid"}, status=403)

	token = auth_header.split(" ")[1]
	# validate token
	try:
		auth_service_url = "http://auth-service:8000/auth/validate-token/"
		headers = {"Authorization": f"Bearer {token}"}
		response = requests.post(auth_service_url, headers=headers)
		if response.status_code != 200:
			return JsonResponse({"error": "Authentication failed."}, status=403)
		user_data = response.json()
		user_id = user_data.get("user_id")
	except requests.RequestException as e:
		return JsonResponse({"error": f"Auth-service is unreachable: {str(e)}"}, status=500)

	# ensure request body is valid JSON
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON in request body."}, status=400)

	tournament_name = data.get("tournament_name")

	if not tournament_name:
		return JsonResponse({"error": "Tournament name is required."}, status=400)

	group_name = f"chat_tournament_{tournament_name}"

	# create the group in channel layer
	channel_layer = get_channel_layer()
	async_to_sync(channel_layer.group_add)(group_name, "placeholder_channel")

	return JsonResponse({"message": f"Tournament chat group '{group_name}' created.", "user_id": user_id}, status=201)
