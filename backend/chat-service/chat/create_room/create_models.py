from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
	name = models.CharField(max_length=255, unique=True)
	creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_rooms")
	invited_users = models.ManyToManyField(User, related_name="invited_rooms", blank=True)
	room_type = models.CharField(max_length=20, choices=[("game", "Game"), ("private", "Private")], default="private")
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.name} ({self.room_type})"
