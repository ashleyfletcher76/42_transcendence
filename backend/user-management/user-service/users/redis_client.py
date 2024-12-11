import redis, threading

_redis_client = None
_pubsub = None
_redis_lock = threading.Lock()
should_stop = threading.Event()

def get_redis_client():
	"""Retrieve a Redis client instance. Init it if it doesnt exist"""
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

def cleanup_redis():
	"""Cleanup Redis connections"""
	global _redis_client, _pubsub
	with _redis_lock:
		should_stop.set()
		if _pubsub:
			_pubsub.close()
		if _redis_client:
			_redis_client.close()
			_redis_client = None
