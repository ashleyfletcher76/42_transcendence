from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connection
import logging

logger = logging.getLogger(__name__)

class SendMessageView(APIView):
    def post(self, request):
        return Response({"message": "Message sent!"})


class ChatHistoryView(APIView):
    def get(self, request):
        return Response({"chat_history": []})

def health_check(request):
    try:
        connection.ensure_connection()
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "ok"}, status=200)
