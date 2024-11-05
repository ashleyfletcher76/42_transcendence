from django.urls import path
from .views import GameStateView

urlpatterns = [
    path('game/', GameStateView.as_view(), name='game_state'),
]