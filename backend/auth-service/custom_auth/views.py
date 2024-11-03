from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class LogoutView(APIView):
	def post(self, request):
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
				return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)