from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
	user = request.user
	profile = user.profile
	data = request.data

	updated_fields = []

	# update nickname
	new_nickname = data.get("nickname")
	if new_nickname:
		if new_nickname != profile.nickname:
			profile.nickname = new_nickname
			updated_fields.append("nickname")

	# update avatar
	new_avatar = data.get("avatar")
	if new_avatar:
		if new_avatar != profile.avatar:
			profile.avatar = new_avatar
			updated_fields.append("avatar")

	if updated_fields:
		profile.save()

		# generate the response
		updated_fields_str = " and ".join(updated_fields)
		return Response(
			{
				"success": True,
				"message": f"{updated_fields_str.capitalize()} updated successfully."
			},
			status=200,
		)

	return Response(
		{
			"success": False,
			"message": "No changes detected in the request."
		},
		status=400,
	)
