import redis
import json

redis_client = redis.StrictRedis.from_url("redis://redis:6379")

TOURNAMENT_PREFIX = "tournament:"

def set_tournament_state(room_name, game_state):
    key = f"{TOURNAMENT_PREFIX}{room_name}"
    redis_client.set(key, json.dumps(game_state))


def get_tournamnet_state(room_name):
    key = f"{TOURNAMENT_PREFIX}{room_name}"
    try:
        tournament = redis_client.get(key)
        return json.loads(tournament) if tournament else None
    except (redis.RedisError, json.JSONDecodeError) as e:
        print(f"Error retrieving game state for room '{room_name}': {e}")
        return None


def delete_tournament_state(room_name):
    key = f"{TOURNAMENT_PREFIX}{room_name}"
    try:
        redis_client.delete(key)
    except redis.RedisError as e:
        print(f"Error deleting game state for room '{room_name}': {e}")


def get_all_tournaments_from_redis():
    """
    Retrieve all tournaments from Redis with the specified prefix.
    """
    tournaments = []
    try:
        keys = redis_client.keys(f"{TOURNAMENT_PREFIX}*")
        for key in keys:
            try:
                tournament_json = redis_client.get(key)
                if tournament_json:
                    tournament_data = json.loads(tournament_json)
                    tournaments.append(tournament_data)
            except (redis.RedisError, json.JSONDecodeError) as e:
                print(f"Error processing tournament data for key '{key}': {e}")
    except redis.RedisError as e:
        print(f"Error fetching tournament keys: {e}")

    return tournaments
