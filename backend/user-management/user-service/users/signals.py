from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserProfile
from django.utils.text import slugify
import uuid

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		default_display_name = slugify(instance.username[:15])
		unique_display_name = default_display_name
		# ensure the nickname is unique
		while UserProfile.objects.filter(nickname=default_display_name).exists():
			unique_display_name = f"{default_display_name[:14]}-{uuid.uuid4().hex[:4]}"
		# create UserProfile
		try:
			UserProfile.objects.create(user=instance, nickname=unique_display_name)
		except Exception as e:
			print(f"Failed to create profile for user {instance.username}: {e}")
