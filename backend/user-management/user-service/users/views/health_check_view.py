from django.http import JsonResponse, HttpResponse
from django.db import connection

health_check_logged = False

def health_check(request):
    global health_check_logged
    try:
        connection.ensure_connection()
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

    if not health_check_logged:
        health_check_logged = True
    return HttpResponse("ok", content_type="text/plain", status=200)
