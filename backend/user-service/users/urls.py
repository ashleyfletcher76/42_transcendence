from django.urls import path
from . import views
from .views import health_check

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="user-register"),
	path("health/", health_check, name="health-check"),
]
