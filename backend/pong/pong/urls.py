from django.urls import path
from .views import GameStateView, health_check, UpdateGameView, game_view, create_room, SearchRoomView
from . import views


# URL patterns for game functionality
urlpatterns = [
    path('view/', game_view, name='game'),
    path("health/", health_check, name="health_check"),
    #path('<str:room_name>/', GameStateView.as_view(), name='game_state'),
    #path('<str:room_name>/update/', UpdateGameView.as_view(), name='update_game'),
    path('create-room/', views.create_room, name='create_room'),
    #path('search-room/', SearchRoomView.as_view(), name='search_room'),
]
