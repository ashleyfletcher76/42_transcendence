from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import UserProfile
import requests

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_id_by_nickname(request):
	try:
		# extract nickname from payload
		data = request.data
		nickname = data.get("nickname", "").strip()
		if not nickname:
			return Response({"error": "Nickname is required."}, status=400)

		user = User.objects.filter(profile__nickname=nickname).first()
		if not user:
			return Response(
				{"error": "User with given nickname not found."},
				status=404
			)
		return Response({"user_id": user.id}, status=200)
	except Exception as e:
		return Response({"error": str(e)}, status=500)

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

		print(f"[DEBUG] Sending request to match-history-service with user_id: {user.id}")

		# fetch match history details
		match_history = {}
		try:
			token = request.headers.get("Authorization")
			match_response = requests.get(
				f"http://match-history-service:8000/match/get-match-history/",
				headers={"Authorization": token},
				params={"user_id": user.id},
			)
			if match_response.status_code == 200:
				match_history = match_response.json()
			else:
				match_history = {"error": "Could not fetch match history"}
		except requests.RequestException as e:
			match_history = {"error": str(e)}

		# response
		profile_response = {
			"username": user.username,
			"nickname": profile.nickname,
			"avatar": profile.avatar.url if profile.avatar else None,
			"trophies": match_history.get("trophies", 0),
			"games_total": match_history.get("games_total", 0),
			"wins": match_history.get("wins", 0),
			"losses": match_history.get("losses", 0),
			"blocked": blocked,
			"friends": friends,
			"history": match_history.get("history", []),
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
		user_ids = list(profiles.values_list("user_id", flat=True))

		trophies_map = {}
		try:
			token = request.headers.get("Authorization")
			if not token:
				raise ValueError("Authorization header is missing")

			match_response = requests.post(
				f"http://match-history-service:8000/match/batch-trophies/",
				headers={"Authorization": token},
				json={"user_ids": user_ids},
			)
			if match_response.status_code == 200:
				trophies_map = match_response.json()
				print(f"[DEBUG] Trophies map received: {trophies_map}")
			else:
				print(f"[DEBUG] Match-history-service returned: {match_response.status_code}, {match_response.text}")
		except requests.RequestException as e:
			print(f"[ERROR] Exception contacting match-history-service: {str(e)}")

		profile_list = []
		for profile in profiles:
			profile_list.append({
				"username": profile.user.username,
				"nickname": profile.nickname,
				"avatar": profile.avatar.url if profile.avatar else None,
				"trophies": trophies_map.get(str(profile.user.id), 0),
				"status": "online" if profile.online else "offline",
			})

		return Response(profile_list, status=200)

	except Exception as e:
		return Response({"error": str(e)}, status=500)
