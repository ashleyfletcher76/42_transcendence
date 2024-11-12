from django.urls import path
from . import views
from .views import health_check

urlpatterns = [
    path("send/", views.SendMessageView.as_view(), name="send-message"),
    path("history/", views.ChatHistoryView.as_view(), name="chat-history"),
    path("your_room_name/", views.ChatHistoryView.as_view(), name="room"),
	path("health/", health_check, name="health-check"),
]
