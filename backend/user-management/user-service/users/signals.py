from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.conf import settings
from .models import UserProfile
import os
from shutil import copyfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	"""Automatically creates a UserProfile and assigns a default avatar when a new user is registered"""
	if created:
		try:
			# create UserProfile
			profile = UserProfile.objects.create(user=instance, nickname=instance.username)

			# define user avatar directory
			user_avatar_dir = os.path.join(settings.MEDIA_ROOT, "avatars", instance.username)
			os.makedirs(user_avatar_dir, exist_ok=True)

			# define default avatar path
			default_avatar_path = os.path.join(settings.MEDIA_ROOT, "default_photo", "default_photo.png")
			user_avatar_path = os.path.join(user_avatar_dir, "default_avatar.png")

			# copy default avatar
			if os.path.exists(default_avatar_path):
				copyfile(default_avatar_path, user_avatar_path)
				print(f"[INFO] Copied default avatar for user: {instance.username}")
			else:
				print(f"[WARNING] Default avatar not found at: {default_avatar_path}")

			# sssign avatar path in database
			profile.avatar = f"avatars/{instance.username}/default_avatar.png"
			profile.save()

		except Exception as e:
			print(f"[ERROR] Failed to create profile for user {instance.username}: {e}")
