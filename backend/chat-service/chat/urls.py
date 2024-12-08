from django.urls import path
from . import views
from .views.health_check_views import health_check
from .views.tournament_view import create_tournament_chat

urlpatterns = [
	path("health/", health_check, name="health-check"),
	path("create-tournament-chat/", create_tournament_chat, name="create-tournament-chat")
]

