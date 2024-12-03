from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
import json

class UserServiceTests(TestCase):
	def setUp(self):
		# create three test users
		self.user1 = User.objects.create_user(username="user1", password="password")
		self.user2 = User.objects.create_user(username="user2", password="password")
		self.user3 = User.objects.create_user(username="user3", password="password")

		# create profiles for test users
		self.user1_profile = self.user1.profile
		self.user2_profile = self.user2.profile
		self.user3_profile = self.user3.profile

		# authenticate as user1 to test
		self.client = APIClient()
		self.client.login(username="user1", password="password")
		refresh = RefreshToken.for_user(self.user1)
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

	def tearDown(self):
		# clean up after each test
		UserProfile.objects.all().delete()
		User.objects.all().delete()

	def test_add_friend(self):
		url = "/users/add-friend/"
		response = self.client.post(url, {"target_username": "user2"})

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertEqual(self.user1_profile.friends.count(), 1)
		self.assertIn(self.user2_profile, self.user1_profile.friends.all())

	def test_add_friend_already_added(self):
		# add friend before testing
		self.user1_profile.friends.add(self.user2_profile)

		# test same friend again
		url = "/users/add-friend/"
		response = self.client.post(url, {"target_username": "user2"})

		# assertions
		self.assertEqual(response.status_code, 400)
		self.assertIn("User is already a friend.", response.data["error"])

	def test_block_user(self):
		url = "/users/block-user/"
		response = self.client.post(url, {"target_username": "user3"})

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertEqual(self.user1_profile.blocked_users.count(), 1)
		self.assertIn(self.user3_profile, self.user1_profile.blocked_users.all())

	def test_block_already_blocked(self):
		# block user before testing
		self.user1_profile.blocked_users.add(self.user2_profile)

		# test same user again
		url = "/users/block-user/"
		response = self.client.post(url, {"target_username": "user2"})

		# assertions
		self.assertEqual(response.status_code, 400)
		self.assertIn("User is already blocked.", response.data["error"])

	def test_add_friend_blocked(self):
		# block user before testing
		self.user1_profile.blocked_users.add(self.user2_profile)

		# test same user again
		url = "/users/add-friend/"
		response = self.client.post(url, {"target_username": "user2"})

		# assertions
		self.assertEqual(response.status_code, 400)
		self.assertIn("You cannot add a user you have blocked.", response.data["error"])

	def test_block_user_friend(self):
		# add user2 before testing
		self.user1_profile.friends.add(self.user2_profile)

		# test same user again
		url = "/users/block-user/"
		response = self.client.post(url, {"target_username": "user2"})

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertNotIn(self.user2_profile, self.user1_profile.friends.all())
		self.assertIn(self.user2_profile, self.user1_profile.blocked_users.all())

	def test_add_nonexistent_user_as_friend(self):
		# test adding a non-existent user
		url = "/users/add-friend/"
		response = self.client.post(url, {"target_username": "nonexistent"})

		# Assertions
		self.assertEqual(response.status_code, 404)
		self.assertIn("Target user not found.", response.data["error"])

	def test_block_nonexistent_user(self):
		# test blocking a non-existent user
		url = "/users/block-user/"
		response = self.client.post(url, {"target_username": "nonexistent"})

		# a\ssertions
		self.assertEqual(response.status_code, 404)
		self.assertIn("Target user not found.", response.data["error"])

	def test_get_own_profile_info(self):
		"""Test retrieving the profile info for the authenticated user."""
		url = "/users/profile-info/"
		response = self.client.post(url, {})

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["username"], self.user1.username)
		self.assertEqual(response.data["nickname"], self.user1_profile.nickname)
		self.assertEqual(response.data["blocked"], [])
		self.assertEqual(response.data["friends"], [])

	def test_get_profile_info_by_nickname(self):
		"""Test retrieving the profile info for a specific user by nickname."""
		# set up user2's profile with a nickname
		self.user2_profile.nickname = "UserTwo"
		self.user2_profile.save()

		url = "/users/profile-info/"
		response = self.client.post(url, {"nickname": "UserTwo"})

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["username"], self.user2.username)
		self.assertEqual(response.data["nickname"], self.user2_profile.nickname)

	def test_get_profile_info_nonexistent_nickname(self):
		"""Test requesting profile info for a non-existent nickname."""
		url = "/users/profile-info/"
		response = self.client.post(url, {"nickname": "NonExistentUser"})

		# assertions
		self.assertEqual(response.status_code, 404)
		self.assertIn("User with given nickname not found.", response.data["error"])

	def test_get_profile_info_unauthenticated(self):
		"""Test accessing profile info without authentication."""
		# remove credentials to simulate unauthenticated access
		self.client.credentials()

		url = "/users/profile-info/"
		response = self.client.post(url, {})

		# assertions
		self.assertEqual(response.status_code, 401)
		self.assertIn("Authentication credentials were not provided.", response.data["detail"])

	def test_get_all_profiles(self):
		"""Test retrieving the list of all profiles."""
		url = "/users/profile-list/"
		response = self.client.get(url)

		# assertions
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.data), 3)
		self.assertEqual(response.data[0]["username"], "user1")
		self.assertEqual(response.data[1]["status"], "TBD")

	def test_update_nickname(self):
		"""Test updating only the nickname."""
		url = "/users/update-profile/"
		payload = {"nickname": "newNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Nickname updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertEqual(self.user1_profile.nickname, "newNickname")

	def test_update_avatar(self):
		"""Test updating only the avatar."""
		url = "/users/update-profile/"
		payload = {"avatar": "newAvatarPath"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Avatar updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertEqual(self.user1_profile.avatar, "newAvatarPath")

	def test_update_both_fields(self):
		"""Test updating both nickname and avatar."""
		url = "/users/update-profile/"
		payload = {"nickname": "newNickname", "avatar": "newAvatarPath"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Nickname and avatar updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertEqual(self.user1_profile.nickname, "newNickname")
		self.assertEqual(self.user1_profile.avatar, "newAvatarPath")

	def test_no_changes(self):
		"""Test when no changes are provided."""
		url = "/users/update-profile/"
		payload = {}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "No changes detected in the request.")
		self.user1_profile.refresh_from_db()
		self.assertEqual(self.user1_profile.nickname, self.user1_profile.nickname)
		self.assertEqual(self.user1_profile.avatar, self.user1_profile.avatar)

	def test_update_profile_unauthenticated(self):
		"""Test accessing update-profile without authentication."""
		self.client.credentials()
		url = "/users/update-profile/"
		payload = {"nickname": "newNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 401)
		self.assertIn("Authentication credentials were not provided.", response.json()["detail"])

	def test_update_online_status_to_true(self):
		url = "/users/update-profile/"
		payload = json.dumps({"online": True})
		response = self.client.put(url, payload, content_type="application/json")
		self.assertEqual(response.status_code, 200)
		self.user1_profile.refresh_from_db()
		self.assertTrue(self.user1_profile.online)

	def test_update_online_status_to_false(self):
		url = "/users/update-profile/"
		payload = json.dumps({"online": False})
		response = self.client.put(url, payload, content_type="application/json")
		self.assertEqual(response.status_code, 200)
		self.user1_profile.refresh_from_db()
		self.assertFalse(self.user1_profile.online)

	def test_invalid_online_status(self):
		url = "/users/update-profile/"
		payload = json.dumps({"online": "invalid_value"})
		response = self.client.put(url, payload, content_type="application/json")
		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["message"], "Online status must be a boolean.")
