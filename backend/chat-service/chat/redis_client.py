import redis, threading

_redis_client = None
_redis_lock = threading.Lock()

def get_redis_client():
	"""Retrieve a Redis client instance. Init it if it doesnt exist."""
	global _redis_client
	with _redis_lock:
		if _redis_client is None:
			try:
				_redis_client = redis.StrictRedis.from_url("redis://redis:6379")
				_redis_client.ping()
				print("Redis client initialized successfully.")
			except redis.ConnectionError as e:
				print(f"Error initializing Redis client: {e}")
				_redis_client = None
		return _redis_client
