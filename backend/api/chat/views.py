from rest_framework.views import APIView
from rest_framework.response import Response

class SendMessageView(APIView):
	def post(self, request):
		return Response({"message": "Message sent!"})

class ChatHistoryView(APIView):
	def get(self, request):
		return Response({"chat_history": []})