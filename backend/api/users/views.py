from rest_framework.views import APIView
from rest_framework.response import Response

class UserProfileView(APIView):
	def get(self, request):
		return Response({"message": "This is the user profile view"})
