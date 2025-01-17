from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.validators import RegexValidator, EmailValidator

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	nickname = models.CharField(
		max_length=50,
		unique=True,
		blank=True,
		validators=[
			RegexValidator(
				regex=r'^[a-zA-Z0-9]*$',
				message="Nickname must contain only letters and numbers.",
			)
		],
	)
	avatar = models.ImageField(
		upload_to="avatars/",
		blank=False,
		null=False,
		default="default_photo/default_photo.png",
	)
	avatar_default = models.ImageField(
		upload_to="avatars/",
		blank=False,
		null=False,
		default="default_photo/default_photo.png",
	)
	bio = models.TextField(blank=True)

	friends = models.ManyToManyField('self', symmetrical=True, blank=True, related_name='friend_profile')
	blocked_users = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='blocked_by')

	online = models.BooleanField(default=False)
	last_seen = models.DateTimeField(default=now)

	#########################
	## Game-related fields ##
	#########################

	game_active = models.BooleanField(default=False)
	tournament_active = models.BooleanField(default=False)
	tournament_name = models.CharField(max_length=100, blank=True, null=True)
	game_name = models.CharField(max_length=100, blank=True, null=True)

	#################
	## 2FA Feature ##
	#################

	twofa_enabled = models.BooleanField(default=False)
	email = models.EmailField(
		max_length=100,
		blank=True,
		null=True,
		validators=[EmailValidator()],
		help_text="Email required for enabling 2FA"
	)

	def __str__(self):
		return self.nickname or self.user.username
