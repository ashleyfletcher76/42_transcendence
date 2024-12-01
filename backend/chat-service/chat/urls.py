from django.urls import path
from . import views
from .create_room.create_room_views import CreateRoomView
from .join_room.join_room_view import JoinRoomView
from .join_room.invite_users_view import InviteUsersView
from .membership.room_membership_view import RoomMembershipView
from .views.health_check_views import health_check
from .views.tournament_view import create_tournament_chat

urlpatterns = [
	path("health/", health_check, name="health-check"),
	path("create-room/", CreateRoomView.as_view(), name="create-room"),
	path("join-room/", JoinRoomView.as_view(), name="join-room"),
	path("invite-users/", InviteUsersView.as_view(), name="invite-users"),
	path("rooms/<int:room_id>/members", RoomMembershipView.as_view(), name="room-members"),
	path("create-tournament-chat/", create_tournament_chat, name="create-tournament-chat")
]

