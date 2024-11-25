from django.urls import re_path
from .consumer import TournamentConsumer

websocket_urlpatterns = [
    re_path(r'^ws/tournament/(?P<room_name>\w+)/$', TournamentConsumer.as_asgi()),
]
