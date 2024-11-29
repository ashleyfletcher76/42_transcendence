from django.urls import re_path
from . import consumer

websocket_urlpatterns = [
    re_path(r'^ws/tournament/(?P<room_name>\w+)/$', consumer.TournamentConsumer.as_asgi()),
]
