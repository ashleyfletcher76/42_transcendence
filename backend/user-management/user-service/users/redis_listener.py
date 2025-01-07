import json, threading, redis, signal
from .redis_client import get_redis_client, should_stop, cleanup_redis

def handle_shutdown(signum, frame):
	"""Handle shutdown signals"""
	print("[INFO] Received shutdown signal, cleaning up Redis connections...")
	cleanup_redis()

def redis_listener():
	"""Listen for Redis events and handle updates"""
	global _pubsub

	if should_stop.is_set():
		return

	try:
		redis_client = get_redis_client()
		_pubsub = redis_client.pubsub()
		_pubsub.subscribe("chat_service_updates")
		print("[INFO] Redis listener started for user-service.")

		while not should_stop.is_set():
			try:
				message = _pubsub.get_message(timeout=1.0)
				if message and message["type"] == "message":
					try:
						event_data = json.loads(message["data"])
						handle_status_update(event_data)
					except json.JSONDecodeError as e:
						print(f"[ERROR] Failed to decode Redis message: {e}")
			except redis.ConnectionError:
				if not should_stop.is_set():
					print("[ERROR] Redis connection error")
				break
			except ValueError:
				# Handle closed file descriptor
				if not should_stop.is_set():
					print("[ERROR] Connection already closed")
				break
			except Exception as e:
				if not should_stop.is_set():
					print(f"[ERROR] Unexpected error in Redis listener: {e}")
				break

	except Exception as e:
		if not should_stop.is_set():
			print(f"[ERROR] Failed to initialize Redis connection: {e}")
	finally:
		if _pubsub:
			try:
				_pubsub.close()
			except Exception:
				pass
		print("[INFO] Redis listener stopped")

def handle_status_update(event_data):
	from .models import UserProfile
	"""Handle status updates received from Redis."""

	if should_stop.is_set():
		return

	action = event_data.get("action")
	nickname = event_data.get("nickname")
	online_status = event_data.get("online_status")

	if action == "online_status_update" and nickname:
		try:
			profile = UserProfile.objects.get(nickname=nickname)
			profile.online = online_status
			profile.save()
			print(f"[INFO] Updated online status for {profile.nickname} to {online_status}")
		except UserProfile.DoesNotExist:
			print(f"[WARNING] User with nickname {nickname} does not exist.")
	else:
		print(f"[WARNING] Unhandled Redis action: {event_data}")



# register signal handlers
signal.signal(signal.SIGTERM, handle_shutdown)
signal.signal(signal.SIGINT, handle_shutdown)

