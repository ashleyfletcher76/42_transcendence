from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
import uuid

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	nickname = models.CharField(max_length=50, unique=True, blank=True, default=uuid.uuid4)
	avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
	bio = models.TextField(blank=True)

	friends = models.ManyToManyField('self', symmetrical=True, blank=True, related_name='friend_profile')
	blocked_users = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='blocked_by')

	online = models.BooleanField(default=False)
	last_seen = models.DateTimeField(default=now)

	def __str__(self):
		return self.nickname or self.user.username




## USERS FRIENDS NEEDS TO BE IMPLEMENTED AND DEFAULT AVATAR PHOTO
