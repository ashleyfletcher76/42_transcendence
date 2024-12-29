import redis
import json

redis_client = redis.StrictRedis.from_url("redis://redis:6379")

GAME_STATE_PREFIX = "game_state:"

def set_game_state(room_name, game_state):
    key = f"{GAME_STATE_PREFIX}{room_name}"
    redis_client.set(key, json.dumps(game_state))


def get_game_state(room_name):
    key = f"{GAME_STATE_PREFIX}{room_name}"
    try:
        game_state = redis_client.get(key)
        return json.loads(game_state) if game_state else None
    except (redis.RedisError, json.JSONDecodeError) as e:
        print(f"Error retrieving game state for room '{room_name}': {e}")
        return None


def delete_game_state(room_name):
    key = f"{GAME_STATE_PREFIX}{room_name}"
    try:
        redis_client.delete(key)
    except redis.RedisError as e:
        print(f"Error deleting game state for room '{room_name}': {e}")


def find_remote_game_states():
    """
    Find all game states where player2 is remote.
    """
    matching_rooms = []
    try:
        # Fetch all game state keys using the prefix
        keys = redis_client.keys(f"{GAME_STATE_PREFIX}*")
        for key in keys:
            try:
                game_state_json = redis_client.get(key)
                if game_state_json:
                    game_state = json.loads(game_state_json)
                    if game_state.get("player2") == "remote":
                        return game_state
            except (redis.RedisError, json.JSONDecodeError) as e:
                print(f"Error processing game state for key '{key}': {e}")
    except redis.RedisError as e:
        print(f"Error fetching game state keys: {e}")

    return None


def get_all_games_from_redis():
    """
    Retrieve all tournaments from Redis with the specified prefix.
    """
    tournaments = []
    try:
        keys = redis_client.keys(f"{GAME_STATE_PREFIX}*")
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