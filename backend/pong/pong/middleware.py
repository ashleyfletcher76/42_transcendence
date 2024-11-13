import logging

class HealthCheckLoggingMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		if request.path == "/pong/health/":
			logging.getLogger("django.server").setLevel(logging.WARNING)
		else:
			logging.getLogger("django.server").setLevel(logging.INFO)

		response = self.get_response(request)
		return response
