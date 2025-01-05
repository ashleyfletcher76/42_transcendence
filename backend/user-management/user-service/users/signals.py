from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		# create UserProfile
		try:
			UserProfile.objects.create(user=instance, nickname=instance.username)
		except Exception as e:
			print(f"Failed to create profile for user {instance.username}: {e}")
