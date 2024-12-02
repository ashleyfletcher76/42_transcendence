from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import timezone
import redis
import json
from django.db.models import Q
from ..models import UserProfile

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
	user = request.user
	profile = user.profile
	data = request.data

	updated_fields = []
	old_nickname = profile.nickname

	# initialize Redis client
	try:
		redis_client = redis.StrictRedis(host="redis", port=6379, db=0)
		redis_client.ping()
	except redis.ConnectionError:
		redis_client = None

	# update nickname
	new_nickname = data.get("nickname")
	if new_nickname:
		if new_nickname != profile.nickname:
			# validate nickname uniqueness
			if UserProfile.objects.filter(Q(nickname=new_nickname)).exists():
				return Response(
					{"success": False, "message": "Nickname is already taken."},
					status=400,
				)

			profile.nickname = new_nickname
			updated_fields.append("nickname")

			# publish nickname change event
			if redis_client:
				try:
					redis_client.publish(
						"nicknames_updates",
						json.dumps(
							{
								"user_id": user.id,
								"old_nickname": old_nickname,
								"new_nickname": new_nickname,
							}
						),
					)
				except redis.ConnectionError as e:
					print(f"Warning: Redis publishing failed - {str(e)}")

	# update avatar
	new_avatar = data.get("avatar")
	if new_avatar:
		if new_avatar != profile.avatar:
			profile.avatar = new_avatar
			updated_fields.append("avatar")

	## UPDATE ONLINE STATUS ##
	new_online_status = data.get("online")
	if new_online_status is not None:
		if not isinstance(new_online_status, bool):
			return Response(
				{"success": False, "message": "Online status must be boolean."},
				status=400,
			)
		profile.online = new_online_status
		updated_fields.append("online")


	if updated_fields:
		profile.save()

		# generate response
		updated_fields_str = " and ".join(updated_fields)
		return Response(
			{
				"success": True,
				"message": f"{updated_fields_str.capitalize()} updated successfully.",
			},
			status=200,
		)

	return Response(
		{"success": False, "message": "No changes detected in the request."},
		status=400,
	)
