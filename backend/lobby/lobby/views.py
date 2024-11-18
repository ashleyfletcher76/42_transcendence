from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
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