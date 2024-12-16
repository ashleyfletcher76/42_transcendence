from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		default_display_name = instance.username[:15]
		# ensure the nickname is unique
		while UserProfile.objects.filter(nickname=default_display_name).exists():
			default_display_name += "1"
			if len(default_display_name) > 15:
				default_display_name = default_display_name[:14] + "1"
		# create UserProfile
		UserProfile.objects.create(user=instance, nickname=default_display_name)
