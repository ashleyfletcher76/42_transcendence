from django.urls import path
from .views import GameStateView, health_check

urlpatterns = [
    path('game/', GameStateView.as_view(), name='game_state'),
	path("health/", health_check, name="health_check"),
]
