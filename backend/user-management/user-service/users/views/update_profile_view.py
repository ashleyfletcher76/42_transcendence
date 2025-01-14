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

def validate_and_update_2fa(data, profile):
	"""Validate and update 2FA auth settings"""
	updated_fields = []
	try:
		# extract fields from request data
		twofa_enabled = data.get("twofa_enabled")
		email = data.get("email")

		# convert `twofa_enabled` to boolean
		if twofa_enabled in (None, "undefined", "null"):
			print("[DEBUG] 2FA is not provided or is undefined/null. Skipping 2FA status update.")
			twofa_enabled = profile.twofa_enabled

		if isinstance(twofa_enabled, str):
			if twofa_enabled.lower() in ("true", "1"):
				twofa_enabled = True
			elif twofa_enabled.lower() in ("false", "0"):
				twofa_enabled = False
			else:
				raise ValueError("2FA status must be a boolean.")

		# handle 2FA updates
		if twofa_enabled is not None:
			if twofa_enabled and not profile.twofa_enabled:
				if not email and not profile.email:
					raise ValueError("Email is required to enable 2FA.")
				if email:
					validator = EmailValidator()
					try:
						validator(email)
					except Exception:
						raise ValueError("Invalid email format.")
					profile.email = email
					updated_fields.append("email")
				profile.twofa_enabled = True
				updated_fields.append("twofa_enabled")
			elif not twofa_enabled and profile.twofa_enabled:
				profile.twofa_enabled = False
				updated_fields.append("twofa_enabled")
			elif twofa_enabled and profile.twofa_enabled:
				print("[DEBUG] 2FA is already enabled. Skipping state update.")
				updated_fields.append("twofa_enabled")



		# handle email updates
		print(f"[DEBUG] ----- Email -----> {email}")
		if email and email != profile.email:
			validator = EmailValidator()
			try:
				validator(email)
			except Exception:
				raise ValueError("Invalid email format.")
			profile.email = email
			updated_fields.append("email")

		# print(f"[DEBUG] validate_and_update_2fa -> twofa_enabled: {twofa_enabled}, email: {email}")
		# print(f"[DEBUG] validate_and_update_2fa -> profile.twofa_enabled: {profile.twofa_enabled}, profile.email: {profile.email}")


		return updated_fields
	except ValueError as e:
		print(f"[DEBUG] Validation error in 2FA: {e}")
		raise

#######################################
# ---------- MAIN FUNCTION ---------- #
#######################################

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
# 	user = request.user
# 	profile = user.profile
# 	data = request.data
# 	redis_client = get_redis_client()

# 	updated_fields = []
# 	errors = {}
# 	old_nickname = profile.nickname

# 	#####################
# 	## Update Nickname ##
# 	#####################
# 	try:
# 		new_nickname = data.get("nickname")
# 		if new_nickname and new_nickname != profile.nickname:
# 			validate_nickname(new_nickname)
# 			profile.nickname = new_nickname
# 			updated_fields.append("nickname")
# 			publish_nickname_change(redis_client, old_nickname, new_nickname)
# 			print(f"New nickname ==== {new_nickname}")
# 			print(f"Nickname ==== {profile.nickname}")
# 	except ValueError as e:
# 		errors["nickname"] = str(e)

# 	###################
# 	## Update Avatar ##
# 	###################
# 	try:
# 		new_avatar = request.FILES.get("avatar")
# 		if new_avatar:
# 			user_directory = os.path.join(settings.MEDIA_ROOT, "avatars", user.username)
# 			profile.avatar.name = update_avatar(new_avatar, user_directory, profile)
# 			updated_fields.append("avatar")
# 	except ValueError as e:
# 		errors["avatar"] = str(e)

# 	##########################
# 	## Update Online Status ##
# 	##########################
# 	try:
# 		new_online_status = data.get("online_status")
# 		if new_online_status is not None:
# 			if not isinstance(new_online_status, bool):
# 				errors["online_status"] = "Online status must be a boolean."
# 			else:
# 				profile.online = new_online_status
# 				updated_fields.append("online")
# 	except ValueError as e:
# 		errors["online_status"] = str(e)

# 	#################
# 	## Update 2FA ##
# 	#################
# 	twofa = data.get("twofa_enabled")
# 	email = data.get("email")
# 	try:
# 		if twofa is not None and twofa != profile.twofa_enabled:
# 			if twofa:  # Enabling 2FA
# 				if not profile.email and not email:
# 					raise ValueError("Email is required to enable Two-Factor Authentication.")

# 				# Validate email if provided
# 				if email and email != profile.email:
# 					validator = EmailValidator()
# 					try:
# 						validator(email)  # Validate email format
# 						profile.email = email
# 						updated_fields.append("email")
# 					except ValidationError as e:
# 						errors["email"] = e.messages[0]  # Add validation error to errors

# 				profile.twofa_enabled = True  # Enable 2FA
# 				updated_fields.append("twofa_enabled")
# 			else:  # Disabling 2FA
# 				profile.twofa_enabled = False
# 				updated_fields.append("twofa_enabled")
# 	except ValueError as e:
# 		errors["twofa_enabled"] = str(e)

# 	##################
# 	## Update Email ##
# 	##################
# 	try:
# 		if email and email != profile.email:
# 			validator = EmailValidator()
# 			try:
# 				validator(email)
# 				profile.email = email
# 				updated_fields.append("email")
# 			except ValidationError as e:
# 				errors["email"] = e.messages[0]
# 	except Exception as e:
# 		errors["email"] = str(e)

# 	# Save profile if updates were made
# 	if updated_fields:
# 		print("Nickname saved ------------------")
# 		profile.save()

# 	# Generate the response
# 	response_data = {
# 		"success": bool(updated_fields),
# 		"message": f"{', '.join(updated_fields).capitalize()} updated successfully." if updated_fields else "No changes detected.",
# 		"errors": errors,
# 	}
# 	return Response(response_data, status=200 if updated_fields else 400)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
	user = request.user
	profile = user.profile
	data = request.data
	redis_client = get_redis_client()

	updated_fields = []
	old_nickname = profile.nickname

	print(f"[DEBUG] Received request data: {data}")

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

		#################
		## 2FA feature ##
		#################

		twofa = data.get("twofa_enabled")
		email = data.get("email")
		check_diff = profile.twofa_enabled
		check_email = profile.email
		if twofa is not check_diff:
			if check_email is None:
				return Response(
					{""}
				)
		# if "twofa_"
		print(f"[DEBUG] Email: {email} ---- 2FA: {twofa} --- new_avatar: {new_avatar} ----- nickname: {new_nickname}")
		if twofa not in (None, "undefined", "null") or email not in (None, "undefined", "null"):
			updated_fields += validate_and_update_2fa(data, profile)

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

		# print(f"[DEBUG] update_profile -> data: {data}")
		# print(f"[DEBUG] update_profile -> initial profile.twofa_enabled: {profile.twofa_enabled}, profile.email: {profile.email}")


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

		## no updates detected, no event published ##
		print(f"[DEBUG] No changes detected for user {user.username}")
		return Response(
			{"success": False, "message": "No changes detected in the request."},
			status=200,
		)

	except ValueError as e:
		print(f"[DEBUG] Validation error: {e}")
		return Response({"success": False, "message": str(e)}, status=400)

	except Exception as e:
		print(f"[ERROR] Unexpected error: {e}")
		return Response({"success": False, "message": "An error occurred."}, status=500)

