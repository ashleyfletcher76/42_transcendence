from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import timezone
import redis, json
from django.db.models import Q
from ..models import UserProfile
from ..redis_client import get_redis_client

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
	user = request.user
	profile = user.profile
	data = request.data
	redis_client = get_redis_client()

	request_old_nickname = data.get("nickname")
	if request_old_nickname and request_old_nickname != profile.nickname:
		return Response(
			{"success": False, "message": "Invalid nickname provided."},
			status=400,
		)

	updated_fields = []
	nickname = profile.nickname

	## update nickname ##
	new_nickname = data.get("new_nickname")
	if new_nickname and new_nickname != profile.nickname:
		## validate nickname uniqueness ##
		if UserProfile.objects.filter(Q(nickname=new_nickname)).exists():
			return Response(
				{"success": False, "message": "Nickname is already taken."},
				status=400,
			)

		profile.nickname = new_nickname
		updated_fields.append("nickname")

		## create nickname event for Redis channel ##
		nickname_event = {
			"action": "nickname_change",
			"old_nickname": nickname,
			"new_nickname": new_nickname,
		}

		try:
			redis_client.publish("user_service_updates", json.dumps(nickname_event))
			print(f"[INFO] Published nickname change event to Redis: {nickname_event}")
		except Exception as e:
			print(f"[ERROR] Failed to publish nickname change to Redis: {e}")

	## update avatar ##
	new_avatar = data.get("avatar")
	if new_avatar:
		if new_avatar != profile.avatar:
			profile.avatar = new_avatar
			updated_fields.append("avatar")

	## update online status ##
	new_online_status = data.get("online_status")
	if new_online_status is not None:
		if not isinstance(new_online_status, bool):
			return Response(
				{"success": False, "message": "Online status must be a boolean."},
				status=400,
			)
		profile.online = new_online_status
		updated_fields.append("online")

		# ## create status event for Redis channel ##
		# status_event = {
		# 	"action": "online_status_update",
		# 	"old_nickname": nickname,
		# 	"online_status": new_online_status,
		# }

		# try:
		# 	redis_client.publish("user_service_updates", json.dumps(status_event))
		# 	print(f"[INFO] Published online status change event to Redis: {status_event}")
		# except Exception as e:
		# 	print(f"[ERROR] Failed to publish online status change to Redis: {e}")

	## save profile info in database and publish event if changes ##
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

