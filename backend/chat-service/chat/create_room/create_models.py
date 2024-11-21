from django.db import models

class ChatRoom(models.Model):
	name = models.CharField(max_length=255, unique=True)
	creator_id = models.IntegerField()
	creator_username = models.CharField(max_length=255)
	invited_users = models.JSONField(default=list, blank=True)
	room_type = models.CharField(max_length=20, choices=[("game", "Game"), ("private", "Private")], default="private")
	created_at = models.DateTimeField(auto_now_add=True)

	def is_user_allowed(self, user_id):
		"""Check if the user is allowed to join the room."""
		return self.room_type == "game" or user_id == self.creator_id or user_id in self.invited_users

	def __str__(self):
		return f"{self.name} ({self.room_type})"
