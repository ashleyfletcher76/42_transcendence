from django.urls import path
from . import views
from .views import health_check
from .create_room.create_room_views import CreateRoomView
from .join_room.join_room_view import JoinRoomView
from .join_room.invite_users_view import InviteUsersView
from .membership.room_membership_view import RoomMembershipView

urlpatterns = [
	path("send/", views.SendMessageView.as_view(), name="send-message"),
	path("history/", views.ChatHistoryView.as_view(), name="chat-history"),
	path("your_room_name/", views.ChatHistoryView.as_view(), name="room"),
	path("health/", health_check, name="health-check"),
	path("create-room/", CreateRoomView.as_view(), name="create-room"),
	path("join-room/", JoinRoomView.as_view(), name="join-room"),
	path("invite-users/", InviteUsersView.as_view(), name="invite-users"),
	path("rooms/<int:room_id>/members", RoomMembershipView.as_view(), name="room-members"),
]

