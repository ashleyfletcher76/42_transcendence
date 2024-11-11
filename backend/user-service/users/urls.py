from django.urls import path
from . import views
from .views import health_check, verify_user

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="user-register"),
	path("verify/", verify_user, name="verify-user"),
	path("health/", health_check, name="health-check"),
]

