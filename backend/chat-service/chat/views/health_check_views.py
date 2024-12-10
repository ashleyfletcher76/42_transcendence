from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connection

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)
