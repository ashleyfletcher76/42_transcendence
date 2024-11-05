from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import health_check

urlpatterns = [
	path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
	path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
	path("logout/", views.LogoutView.as_view(), name="logout"),
	path("health/", health_check, name="health-check"),
]
