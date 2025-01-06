from django.urls import re_path, path
from . import consumers

print("WebSocket routing set up")

websocket_urlpatterns = [
	re_path(r"ws/chat/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
	path("ws/chat/tournament/<str:tournament_name>/", consumers.ChatConsumer.as_asgi()),
]

print("WebSocket URL routing set up.")
