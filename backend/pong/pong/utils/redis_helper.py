import redis
import json

redis_client = redis.StrictRedis.from_url("redis://redis:6379")

def set_game_state(room_name, game_state):
    redis_client.set(room_name, json.dumps(game_state))

def get_game_state(room_name):
    game_state = redis_client.get(room_name)
    return json.loads(game_state) if game_state else None

def delete_game_state(room_name):
    redis_client.delete(room_name)
