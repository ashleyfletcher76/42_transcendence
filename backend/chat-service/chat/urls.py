from django.urls import path
from .views.health_check_views import health_check

urlpatterns = [
	path("health/", health_check, name="health-check")
]

