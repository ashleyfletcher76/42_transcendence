import redis, json, threading
from .models import UserProfile
from .redis_client import get_redis_client

def handle_online_status_update(data):
	"""Proces the online status update and update UserProfile inside the database"""
	try:
		nickname = data["nickname"]
		online_status = data["online"]

		# update the UserProfile in the database
		user_profile = UserProfile.objects.filter(nickname=nickname).first()
		if user_profile:
			user_profile.online = online_status
			user_profile.save()
			print(f"[DEBUG] Updated online status for {nickname} to {online_status}")
		else:
			print(f"[WARNING] No user found for {nickname}")
	except KeyError as e:
		print(f"[ERROR] Missing key in online_status_updates data: {e}")
	except Exception as e:
		print(f"[ERROR] Failed to update online status: {e}")

def start_redis_listener():
	"""Start Redis listener for online_status_updates"""
	redis_client = get_redis_client()

	def redis_listener():
		try:
			pubsub = redis_client.pubsub()
			pubsub.subscribe("online_status_updates")
			print("[DEBUG] Subscribed to online_status_updates")

			print("[INFO] Redis listener for online_status_updates started...")
			for message in pubsub.listen():
				print(f"[DEBUG] Message received: {message}")
				if message["type"] == "message":
					data = json.loads(message["data"])
					handle_online_status_update(data)
		except Exception as e:
			print(f"[ERROR] Redis listener error: {e}")

	listener_thread = threading.Thread(target=redis_listener, daemon=True)
	listener_thread.start()

