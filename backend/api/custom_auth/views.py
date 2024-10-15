from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
	def get(self, request):
		return Response({"message": "Login view works"})
