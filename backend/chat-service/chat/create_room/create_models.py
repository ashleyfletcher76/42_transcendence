from django.db import models

class ChatRoom(models.Model):
	ROOM_TYPE_CHOICES = [
		("game", "Game"),
		("private", "Private"),
		("global_lobby", "Global Lobby"),
	]

	name = models.CharField(max_length=255, unique=True)
	creator_id = models.IntegerField()
	creator_username = models.CharField(max_length=255)
	invited_users = models.JSONField(default=list, blank=True)
	room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES, default="private")
	created_at = models.DateTimeField(auto_now_add=True)

	def is_user_allowed(self, user_id):
		"""
		Check if the user is allowed to join the room:
		- Global Lobby: Open to everyone.
		- Private: Only creator and invited users.
		- Game: Open to everyone (could include game-specific logic in the future).
		"""
		if self.room_type == "global_lobby":
			return True
		return user_id == self.creator_id or user_id in self.invited_users

	def get_all_usernames(self):
		"""Return a list of all usernames in the room (creator + invited users)."""
		return [self.creator_username] + [user["username"] for user in self.invited_users]

	def __str__(self):
		return f"{self.name} ({self.get_room_type_display()})"
