from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
import logging
from .utils.redis_helper import get_all_tournaments_from_redis, delete_tournament_state

logger = logging.getLogger(__name__)

# Create your views here.

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)

def index(request):
    return render(request, "lobby/index.html")

def listLobby(request):
    if request.method == 'GET':
        tournaments = get_all_tournaments_from_redis()
        # print(tournaments)

        # for t in tournaments:
        #     delete_tournament_state(t.get("name"))

        if tournaments:
            tournaments_list = [
                {
                    "name": t.get("name"),
                    "num_players": t.get("num_players"),
                    "active": t.get("active"),
                }
                for t in tournaments if t.get("num_players", 0) > 0 and t.get("ongoing") == False and t.get("active") == True
            ]
            response = {"tournaments": tournaments_list}
        else:
            response = {"message": "No active tournaments found"}

        return JsonResponse(response)