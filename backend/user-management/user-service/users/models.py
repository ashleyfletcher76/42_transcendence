from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	display_name = models.CharField(max_length=15, unique=True, blank=False)
	avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
	bio = models.TextField(blank=True)

	def __str__(self):
		return self.display_name or self.user.username
