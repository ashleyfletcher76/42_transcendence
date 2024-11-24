class DebugTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth_header = request.headers.get("Authorization", "")
        print(f"Authorization Header: {auth_header}")
        response = self.get_response(request)
        return response

