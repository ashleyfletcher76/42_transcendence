from django.urls import path
from . import views

urlpatterns = [
	path('start/', views.StartGameView.as_view(), name='start-game'),
	path('status/', views.GameStatusView.as_view(), name='game-status'),
]