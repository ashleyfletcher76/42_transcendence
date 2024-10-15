from rest_framework.views import APIView
from rest_framework.response import Response

class StartGameView(APIView):
	def post(self, request):
		return Response({"game": "Game Started"})

class GameStatusView(APIView):
	def get(self, request):
		return Response({"Status": "Game in progress..."})

