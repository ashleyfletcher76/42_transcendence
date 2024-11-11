from django.urls import path
from .views import GameStateView, health_check, UpdateGameView, game_view, CreateRoomView, SearchRoomView

# URL patterns for game functionality
urlpatterns = [
    path('view/', game_view, name='game'),
    path("health/", health_check, name="health_check"),
    path('api/game/<str:room_name>/', GameStateView.as_view(), name='game_state'),
    path('api/game/<str:room_name>/update/', UpdateGameView.as_view(), name='update_game'),
    path('api/game/create-room/', CreateRoomView.as_view(), name='create_room'),
    path('api/game/search-room/', SearchRoomView.as_view(), name='search_room'),
]
