from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import UserProfile

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_single_user_data(request, user_id):
	try:
		print(f"Recived request for user ID: {user_id}")
		user = User.objects.get(id=user_id)
		profile = user.profile

		user_data = {
			"user_id": user.id,
			"username": user.username,
			"nickname": profile.nickname,
		}
		# print(f"Returning user data: {user_data}")
		return Response(user_data, status=200)
	except User.DoesNotExist:
		print(f"User ID {user_id} not found")
		return Response({"error": "User not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usernames(request):
	try:
		user_ids = request.GET.getlist("user_ids")
		user_ids = [int(uid) for uid in user_ids]
		users = User.objects.filter(id__in=user_ids).values("id", "username")
		return JsonResponse({"users": list(users)})
	except ValueError:
		return JsonResponse({"error": "Invalid user ID's"}, status=400)
	except Exception as e:
		return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_token(request):
	try:
		user = request.user
		profile = user.profile
		return JsonResponse(
			{
				"user_id": user.id,
				"username": user.username,
				"nickname": profile.nickname,
				"avatar": profile.avatar.url if profile.avatar else None,
				"bio": profile.bio,
			},
			status=200,
		)
	except User.DoesNotExist:
		return JsonResponse({"error": "User not found."}, status=404)

##################################################
### Latest user profile enquiry using nickname ###
##################################################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_profile_info(request):
	try:
		# extract nickname from request
		data = request.data
		nickname = data.get("nickname", "").strip()

		if nickname:
			user = User.objects.filter(profile__nickname=nickname).first()
			if not user:
				return Response(
					{"error": "User with given nickname not found."},
					status=404
				)
		else:
			# fetch from requester
			user = request.user

		# retrieve profile details
		profile = user.profile
		friends = list(profile.friends.values_list('nickname', flat=True))
		blocked = list(profile.blocked_users.values_list('nickname', flat=True))

		# response
		profile_response = {
			"username": user.username,
			"nickname": profile.nickname,
			"avatar": profile.avatar.url if profile.avatar else None,
			"trophies": "TBD",
			"games_total": "TBD",
			"wins": "TBD",
			"losses": "TBD",
			"blocked": blocked,
			"friends": friends,
			"history": "TBD",
			"status": "online" if profile.online else "offline",
			"last_seen": profile.last_seen
		}
		return Response(profile_response, status=200)

	except Exception as e:
		return Response({"error": str(e)}, status=500)


############################
### Profile list enquiry ###
############################

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_profiles(request):
	try:
		profiles = UserProfile.objects.all().select_related('user')
		profile_list = [
			{
				"username": profile.user.username,
				"nickname": profile.nickname,
				"avatar": profile.avatar.url if profile.avatar else None,
				"trophies": "TBD",
				"status": "TBD",
			}
			for profile in profiles
		]

		return Response(profile_list, status=200)

	except Exception as e:
		return Response({"error": str(e)}, status=500)
