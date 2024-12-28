from django.urls import path
from . import views


# URL patterns for game functionality
urlpatterns = [
    path("health/", views.health_check, name="health_check"),
    path('pong/game_state/<str:room_name>', views.game_state_view, name='game_state'),
    path('pong/create-room', views.create_room, name='create_room'),
]
