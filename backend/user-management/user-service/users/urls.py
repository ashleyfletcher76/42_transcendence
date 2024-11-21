from django.urls import path
from . import views
from .views import health_check, verify_user, UserExistsView, UserProfileView
from .views.get_user_info_view import get_user_info

urlpatterns = [
	path("register/", views.UserRegisterView.as_view(), name="user-register"),
	path("verify/", verify_user, name="verify-user"),
	path("health/", health_check, name="health-check"),
	path("exists/<int:user_id>/", UserExistsView.as_view(), name="user-exists"),
	path("profile/", UserProfileView.as_view(), name="user-profile"),
	path("get-username/<int:user_id>", get_user_info, name="get-username")
]
