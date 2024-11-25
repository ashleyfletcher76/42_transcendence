from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
from .models import Tournament
import logging

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
        tournaments = Tournament.objects.values('name', 'num_players')
        tournaments_list = list(tournaments)
        
        return JsonResponse({'tournaments': tournaments_list}, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)