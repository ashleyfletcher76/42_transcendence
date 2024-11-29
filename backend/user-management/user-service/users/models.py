from django.db import models
from django.contrib.auth.models import User
import uuid

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	display_name = models.CharField(max_length=50, unique=True, blank=True, default=uuid.uuid4)
	avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
	bio = models.TextField(blank=True)

	friends = models.ManyToManyField('self', symmetrical=True, blank=True, related_name='friend_profile')
	blocked_users = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='blocked_by')

	def __str__(self):
		return self.display_name or self.user.username




## USERS FRIENDS NEEDS TO BE IMPLEMENTED AND DEFAULT AVATAR PHOTO
