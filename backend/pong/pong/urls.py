from django.urls import path, include
from .views import GameStateView, health_check, index

urlpatterns = [
    path('game/', GameStateView.as_view(), name='game_state'),
	path("health/", health_check, name="health_check"),
	path('', include('game.urls')),
	path('', index, name='index'),
]
