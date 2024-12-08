import json, threading, redis
from .redis_client import get_redis_client

def redis_listener():
	"""Listen for Redis events and handle updates"""
	redis_client = get_redis_client()
	pubsub = redis_client.pubsub()
	pubsub.subscribe("user_update")

	print("[INFO] Redis listener started for user-service.")

	for message in pubsub.listen():
		if message["type"] == "message":
			try:
				event_data = json.loads(message["data"])
				handle_status_update(event_data)
			except json.JSONDecodeError as e:
				print(f"[ERROR] Failed to decode Redis message: {e}")

def handle_status_update(event_data):
	from .models import UserProfile
	"""Handle status updates received from Redis."""

	action = event_data.get("action")
	old_nickname = event_data.get("old_nickname")
	online_status = event_data.get("online_status")

	if action == "online_status_update" and old_nickname:
		# update online status in database
		try:
			profile = UserProfile.objects.get(nickname=old_nickname)
			profile.online = online_status
			profile.save()
			print(f"[INFO] Updated online status for {profile.nickname} to {online_status}")
		except UserProfile.DoesNotExist:
			print(f"[WARNING] User with nickname {old_nickname} does not exist.")
	else:
		print(f"[WARNING] Unhandled Redis action: {event_data}")

