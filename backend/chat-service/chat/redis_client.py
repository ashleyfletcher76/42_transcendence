import redis
import threading
import json
import asyncio

_redis_client = None
_pubsub = None
_redis_lock = threading.Lock()
should_stop = threading.Event()

def get_redis_client():
	"""Retrieve a Redis client instance. Initialize if it doesn't exist."""
	global _redis_client
	with _redis_lock:
		if _redis_client is None:
			try:
				_redis_client = redis.StrictRedis.from_url("redis://redis:6379")
				_redis_client.ping()
				print("[INFO] Redis client initialized successfully.")
			except redis.ConnectionError as e:
				print(f"[ERROR] Error initializing Redis client: {e}")
				_redis_client = None
	return _redis_client

def cleanup_redis():
	"""Cleanup Redis connections."""
	global _redis_client, _pubsub
	with _redis_lock:
		should_stop.set()
		if _pubsub:
			_pubsub.close()
		if _redis_client:
			_redis_client.close()
			_redis_client = None

def redis_listener(user_channels, channels_lock):
    """Listen for Redis events and update user_channels."""
    global _pubsub

    try:
        redis_client = get_redis_client()
        _pubsub = redis_client.pubsub()
        _pubsub.subscribe("user_service_updates")
        print("[INFO] Subscribed to user_service_updates.")

        while not should_stop.is_set():
            try:
                message = _pubsub.get_message(timeout=1.0)
                if message and message["type"] == "message":
                    try:
                        event_data = json.loads(message["data"])
                        handle_user_service_event(event_data, user_channels, channels_lock)
                    except json.JSONDecodeError as e:
                        print(f"[ERROR] Failed to decode Redis message: {e}")
            except redis.ConnectionError as e:
                if not should_stop.is_set():
                    print(f"[ERROR] Redis connection error: {e}")
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
            except Exception as e:
                print(f"[ERROR] Failed to close pubsub: {e}")
        print("[INFO] Redis listener stopped.")


def handle_user_service_event(event_data, user_channels, channels_lock):
	"""Handle events from user-service."""
	action = event_data.get("action")
	old_nickname = event_data.get("old_nickname")
	new_nickname = event_data.get("new_nickname")

	print(f"[DEBUG] Handling event: {event_data}")

	if action == "nickname_change" and old_nickname and new_nickname:
		with channels_lock:
			if old_nickname in user_channels:
				consumers = user_channels.pop(old_nickname)
				user_channels[new_nickname] = consumers
				for consumer in consumers:
					consumer.nickname = new_nickname
				print(f"[INFO] Updated nickname in user_channels: {old_nickname} -> {new_nickname}")
			else:
				print(f"[WARNING] Old nickname {old_nickname} not found in user_channels.")
	else:
		print(f"[WARNING] Unhandled event: {event_data}")

def start_redis_listener(user_channels, channels_lock):
	"""Start the Redis listener in a background thread."""
	listener_thread = threading.Thread(
		target=redis_listener, args=(user_channels, channels_lock), daemon=True
	)
	listener_thread.start()
	print("[INFO] Redis listener thread started.")
	return listener_thread

