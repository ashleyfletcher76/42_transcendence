from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        default_display_name = instance.username[:15]  # Truncate to fit the database constraint
        UserProfile.objects.create(user=instance, display_name=default_display_name)

