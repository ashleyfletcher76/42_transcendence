from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatRoom(models.Model):
	ROOM_TYPE_CHOICES = [
		("group", "Group"),
		("private", "Private"),
		("lobby", "Lobby"),
	]

	name = models.CharField(max_length=255, unique=True)
	room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES, default="group")
	created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_rooms")
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.name} ({self.room_type})"

	def is_user_allowed(self, user):
		"""Check if a user is allowed in the room."""
		if self.room_type == "lobby":
			return True  # Lobby is open to all users
		return RoomMembership.objects.filter(user=user, room=self).exists()

class RoomMembership(models.Model):
	ROLE_CHOICES = [
		("admin", "Admin"),
		("member", "Member"),
	]

	user_id = models.IntegerField()
	room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="memberships")
	role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="member")
	joined_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		unique_together = ("user_id", "room")

	def __str__(self):
		return f"{self.user_id} in {self.room.name} as {self.role}"
