from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views.health_check_view import health_check
from .views.login_logout_views import LoginView, LogoutView
from .views.validate_user_tokens import ValidateUserView, ValidateTokenView, GetUserFromTokenView

urlpatterns = [
	path("login/", LoginView.as_view(), name="login"),
	path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
	path("logout/", views.LogoutView.as_view(), name="logout"),
	path("health/", health_check, name="health-check"),
	path("validate-token/", ValidateTokenView.as_view(), name="validate-token"),
	path("validate-user/<int:user_id>/", ValidateUserView.as_view(), name="validate-user"),
	path("get-user-token/", GetUserFromTokenView.as_view(), name="get-user-token"),
]
