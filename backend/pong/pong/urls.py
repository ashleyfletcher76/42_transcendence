from django.urls import path
from . import views


# URL patterns for game functionality
urlpatterns = [
    path('view/', views.game_view, name='game'),
    path("health/", views.health_check, name="health_check"),
    path('game_state/<str:room_name>/', views.game_state_view, name='game_state'),
    path('create-room/', views.create_room, name='create_room'),
    path('search-room/', views.search_room, name='search_room'),
]
