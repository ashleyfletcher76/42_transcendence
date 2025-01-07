from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
# from datetime import timezone
import json, re, os, uuid
from django.db.models import Q
from ..models import UserProfile
from ..redis_client import get_redis_client

##########################################
# ---------- HELPER FUNCTIONS ---------- #
##########################################

def validate_nickname(new_nickname):
	"""Validate the nickname format and uniqeness"""
	if not re.match(r'^[a-zA-Z0-9]*$', new_nickname):
		raise ValueError("Nickname must contain only letters and numbers.")
	if UserProfile.objects.filter(nickname__iexact=new_nickname).exists():
		print(f"[DEBUG] We cannot change nickname to -> {new_nickname}")
		raise ValueError("Nickname is already taken.")

def update_avatar(new_avatar, user_directory, profile):
	"""Update the avatar file, replace the old one and save the new path"""
	 # Check file size
	max_size_bytes = 5 * 1024 * 1024
	if new_avatar.size > max_size_bytes:
		raise ValueError(f"Avatar file size exceeds {5}MB limit.")

	os.makedirs(user_directory, exist_ok=True)

	# remove old avatar
	if profile.avatar:
		old_avatar_path = profile.avatar.path
		if os.path.exists(old_avatar_path):
			os.remove(old_avatar_path)

	# save new avatar with unique filename
	avatar_filename = f"{uuid.uuid4()}_{new_avatar.name}"
	avatar_path = os.path.join(user_directory, avatar_filename)
	with default_storage.open(avatar_path, "wb+") as destination:
		for chunk in new_avatar.chunks():
			destination.write(chunk)
	return os.path.relpath(avatar_path, settings.MEDIA_ROOT)

def publish_nickname_change(redis_client, old_nickname, new_nickname):
	"""Publish the nickname change event to Redis"""
	nickname_event = {
		"action": "nickname_change",
		"old_nickname": old_nickname,
		"new_nickname": new_nickname,
	}

	try:
		redis_client.publish("user_service_updates", json.dumps(nickname_event))
		print(f"[INFO] Published nickname change event to Redis: {nickname_event}")
	except Exception as e:
		print(f"[ERROR] Failed to publish nickname change to Redis: {e}")

def publish_online_status_change(redis_client, nickname, online_status):
	"""Publish the nickname change event to Redis"""
	status_event = {
		"action": "status_change",
		"nickname": nickname,
		"status": online_status
	}
	try:
		redis_client.publish("user_service_updates", json.dumps(status_event))
		print(f"[INFO] Published online status change event to Redis: {status_event}")
	except Exception as e:
		print(f"[ERROR] Failed to publish online status change to Redis: {e}")

#######################################
# ---------- MAIN FUNCTION ---------- #
#######################################

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
	user = request.user
	profile = user.profile
	data = request.data
	redis_client = get_redis_client()

	updated_fields = []
	old_nickname = profile.nickname

	try:
		#####################
		## update nickname ##
		#####################
		new_nickname = data.get("nickname")
		if new_nickname and new_nickname != profile.nickname:
			validate_nickname(new_nickname)
			profile.nickname = new_nickname
			updated_fields.append("nickname")
			publish_nickname_change(redis_client, old_nickname, new_nickname)

		###################
		## update avatar ##
		###################
		new_avatar = request.FILES.get("avatar")
		if new_avatar:
			# create user-specific directory
			user_directory = os.path.join(settings.MEDIA_ROOT, "avatars", user.username)
			profile.avatar.name = update_avatar(new_avatar, user_directory, profile)
			updated_fields.append("avatar")

		##########################
		## update online status ##
		##########################
		new_online_status = data.get("online_status")
		if new_online_status is not None:
			if not isinstance(new_online_status, bool):
				return Response(
					{"success": False, "message": "Online status must be a boolean."},
					status=400,
				)
			profile.online = new_online_status
			updated_fields.append("online")
			# publish the event only if the status changes
			publish_online_status_change(redis_client, profile.nickname, new_online_status)

		## save profile info in database ##
		if updated_fields:
			profile.save()

			## generate response for successful updates ##
			updated_fields_str = " and ".join(updated_fields)
			return Response(
				{
					"success": True,
					"message": f"{updated_fields_str.capitalize()} updated successfully.",
				},
				status=200,
			)

		## no updates detected, no event published ##
		return Response(
			{"success": False, "message": "No changes detected in the request."},
			status=400,
		)

	except ValueError as e:
		return Response({"success": False, "message": str(e)}, status=400)

	except Exception as e:
		print(f"[ERROR] {e}")
		return Response({"success": False, "message": "An error occurred."}, status=500)

