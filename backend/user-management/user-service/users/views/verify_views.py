import logging
from rest_framework import status, generics
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.views import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..serializer import UserProfileSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        # fetch user info
        user_profile = user.profile
        nickname = user_profile.nickname
        return Response(
            {
                "user_id": user.id,
                "nickname": nickname,
                "message": "User verified",
            },
            status=status.HTTP_200_OK
        )
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserExistsView(View):
    def get(self, request, user_id):
        try:
            # check if exists
            user = User.objects.get(id=user_id)
            return JsonResponse({"exists": True}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"exists": False}, status=404)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
