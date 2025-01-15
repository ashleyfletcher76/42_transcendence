from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
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

	old_nickname = profile.nickname
	old_twofa = profile.twofa_enabled
	old_email = profile.email

	new_nickname = data.get("nickname")
	new_twofa = data.get("twofa_enabled")
	new_email = data.get("email")
	new_avatar = data.get("avatar")

	# normalize input values to handle "null"
	if isinstance(new_email, str) and new_email.strip().lower() == "null":
		new_email = None
	if isinstance(new_nickname, str) and new_nickname.strip().lower() == "null":
		new_nickname = None
	if new_avatar == "null":
		new_avatar = None

	if isinstance(new_twofa, str):
		if new_twofa.lower() in ("true", "1"):
			new_twofa = True
		elif new_twofa.lower() in ("false", "0"):
			new_twofa = False

	no_changes_detected = (
		(new_nickname == old_nickname or not new_nickname) and
		(new_email == old_email or not new_email) and
		(new_twofa == old_twofa or new_twofa is None) and
		(not new_avatar)
	)

	if no_changes_detected:
		print("[DEBUG] No changes detected. Exiting early.")
		return Response(
			{
				"success": False,
				"message": "No changes detected."
			},
			status=200
		)

	updated_fields = []

	try:
		try:
			if new_nickname and new_nickname != old_nickname:
				validate_nickname(new_nickname)
				profile.nickname = new_nickname
				updated_fields.append("nickname")
				publish_nickname_change(redis_client, old_nickname, new_nickname)
		except ValueError as e:
			print(f"[ERROR] Nickname error occured: {e}")
			return Response (
				{
					"success": False,
					"message": str(e)
				},
				status=400
			)
		try:
			new_avatar = request.FILES.get("avatar")
			if new_avatar:
				user_directory = os.path.join(settings.MEDIA_ROOT, "avatars", user.username)
				profile.avatar.name = update_avatar(new_avatar, user_directory, profile)
				updated_fields.append("avatar")
		except ValueError as e:
			print(f"[ERROR] Avatar error occured: {e}")
			return Response (
				{
					"success": False,
					"message": str(e)
				},
				status=400
			)
		try:
			# validate email
			if new_email and new_email.strip().lower() != "null" and new_email != old_email:
				validator = EmailValidator()
				try:
					validator(new_email)
				except ValidationError as e:
					return Response(
						{"success": False, "message": "Invalid email format."},
						status=400
					)
				profile.email = new_email
				updated_fields.append("email")

			# handle 2FA logic
			if new_twofa is True:  # enabling 2FA
				if not (new_email or old_email):
					return Response(
						{
							"success": False,
							"message": "An email address is required to enable Two-Factor Authentication."
						},
						status=400
					)
				profile.twofa_enabled = True
				updated_fields.append("twofa_enabled")
			elif new_twofa is False and new_twofa != old_twofa:  # disabling 2FA
				profile.twofa_enabled = False
				updated_fields.append("twofa_enabled")

		except ValueError as e:
			print(f"[ERROR] Validation error: {e}")
			return Response(
				{"success": False, "message": str(e)},
				status=400
			)
		## save profile info in database ##
		if updated_fields:
			profile.save()

			## generate response for successful updates ##
			updated_fields_str = " and ".join(updated_fields)
			print(f"[DEBUG] Updated fields: {updated_fields}")
			return Response(
				{
					"success": True,
					"message": f"{updated_fields_str.capitalize()} updated successfully.",
				},
				status=200,
			)

	except Exception as e:
		print(f"[ERROR] Unexpected error: {e}")
		return Response({"success": False, "message": "An error occurred."}, status=500)

