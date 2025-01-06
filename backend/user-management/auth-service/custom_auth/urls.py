from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views.health_check_view import health_check
from .views.login_logout_views import LoginView, LogoutView
from .views.validate_user_tokens import GetUserFromTokenView

urlpatterns = [
	path("login/", LoginView.as_view(), name="login"),
	path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
	path("logout/", LogoutView.as_view(), name="logout"),
	path("health/", health_check, name="health-check"),
	path("get-user-token/", GetUserFromTokenView.as_view(), name="get-user-token"),
]
