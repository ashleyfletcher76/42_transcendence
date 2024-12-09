from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
import json


class UserServiceTests(TestCase):
	def setUp(self):
		"""Set up test environment, including test users and authentication."""
		# Create test users
		self.user1 = User.objects.create_user(username="user1", password="password")
		self.user2 = User.objects.create_user(username="user2", password="password")
		self.user3 = User.objects.create_user(username="user3", password="password")

		# Create profiles for test users
		self.user1_profile = self.user1.profile
		self.user2_profile = self.user2.profile
		self.user3_profile = self.user3.profile

		# Authenticate as user1
		self.client = APIClient()
		self.client.login(username="user1", password="password")
		refresh = RefreshToken.for_user(self.user1)
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

	def tearDown(self):
		"""Clean up test environment."""
		UserProfile.objects.all().delete()
		User.objects.all().delete()

	# Tests for add-friend endpoint
	def test_add_friend(self):
		url = "/users/add-friend/"
		payload = {"nickname": "user2", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["success"], True)
		self.assertEqual(response.data["message"], "You are now friends with user2.")
		self.assertIn(self.user2_profile, self.user1_profile.friends.all())

	def test_remove_friend(self):
		self.user1_profile.friends.add(self.user2_profile)

		url = "/users/add-friend/"
		payload = {"nickname": "user2", "type": "remove"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["success"], True)
		self.assertEqual(response.data["message"], "user2 has been removed from your friend list.")
		self.assertNotIn(self.user2_profile, self.user1_profile.friends.all())

	def test_add_friend_already_added(self):
		self.user1_profile.friends.add(self.user2_profile)

		url = "/users/add-friend/"
		payload = {"nickname": "user2", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "User is already a friend.")

	def test_remove_friend_not_added(self):
		url = "/users/add-friend/"
		payload = {"nickname": "user2", "type": "remove"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "User is not in your friend list.")

	def test_add_friend_blocked(self):
		self.user1_profile.blocked_users.add(self.user2_profile)

		url = "/users/add-friend/"
		payload = {"nickname": "user2", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "You cannot add a user you have blocked.")

	def test_add_friend_nonexistent_user(self):
		url = "/users/add-friend/"
		payload = {"nickname": "nonexistent", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 404)
		self.assertEqual(response.data["error"], "Target user not found.")

	# Tests for block-user endpoint
	def test_block_user(self):
		url = "/users/block-user/"
		payload = {"nickname": "user3", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["success"], True)
		self.assertEqual(response.data["message"], "user3 has been added to your blocklist.")
		self.assertIn(self.user3_profile, self.user1_profile.blocked_users.all())

	def test_unblock_user(self):
		self.user1_profile.blocked_users.add(self.user2_profile)

		url = "/users/block-user/"
		payload = {"nickname": "user2", "type": "remove"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["success"], True)
		self.assertEqual(response.data["message"], "user2 has been removed from your blocklist.")
		self.assertNotIn(self.user2_profile, self.user1_profile.blocked_users.all())

	def test_block_user_already_blocked(self):
		self.user1_profile.blocked_users.add(self.user2_profile)

		url = "/users/block-user/"
		payload = {"nickname": "user2", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "user2 is already blocked.")

	def test_unblock_user_not_blocked(self):
		url = "/users/block-user/"
		payload = {"nickname": "user2", "type": "remove"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "user2 is not in your blocklist.")

	def test_block_user_friend(self):
		self.user1_profile.friends.add(self.user2_profile)

		url = "/users/block-user/"
		payload = {"nickname": "user2", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data["success"], True)
		self.assertEqual(response.data["message"], "user2 has been added to your blocklist.")
		self.assertNotIn(self.user2_profile, self.user1_profile.friends.all())
		self.assertIn(self.user2_profile, self.user1_profile.blocked_users.all())

	def test_block_user_nonexistent_user(self):
		url = "/users/block-user/"
		payload = {"nickname": "nonexistent", "type": "add"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 404)
		self.assertEqual(response.data["error"], "Target user not found.")

	def test_update_nickname(self):
		"""Test updating the nickname successfully."""
		url = "/users/update-profile/"
		payload = {"new_nickname": "newNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Nickname updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertEqual(self.user1_profile.nickname, "newNickname")

	def test_update_nickname_already_taken(self):
		"""Test trying to update the nickname to an existing one."""
		self.user2_profile.nickname = "existingNickname"
		self.user2_profile.save()

		url = "/users/update-profile/"
		payload = {"new_nickname": "existingNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "Nickname is already taken.")
		self.user1_profile.refresh_from_db()
		self.assertNotEqual(self.user1_profile.nickname, "existingNickname")

	def test_update_nickname_invalid(self):
		"""Test updating nickname with the wrong current nickname."""
		url = "/users/update-profile/"
		payload = {"nickname": "invalidNickname", "new_nickname": "anotherNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "Invalid nickname provided.")

	def test_update_online_status_to_true(self):
		"""Test updating online status to True."""
		url = "/users/update-profile/"
		payload = json.dumps({"online_status": True})
		response = self.client.put(url, payload, content_type="application/json")

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Online updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertTrue(self.user1_profile.online)

	def test_update_online_status_to_false(self):
		"""Test updating online status to False."""
		self.user1_profile.online = True
		self.user1_profile.save()

		url = "/users/update-profile/"
		payload = json.dumps({"online_status": False})
		response = self.client.put(url, payload, content_type="application/json")

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json()["success"], True)
		self.assertEqual(response.json()["message"], "Online updated successfully.")
		self.user1_profile.refresh_from_db()
		self.assertFalse(self.user1_profile.online)

	def test_update_online_status_invalid(self):
		"""Test updating online status with an invalid value."""
		url = "/users/update-profile/"
		payload = json.dumps({"online_status": "invalid_value"})
		response = self.client.put(url, payload, content_type="application/json")

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "Online status must be a boolean.")
		self.user1_profile.refresh_from_db()
		self.assertNotEqual(self.user1_profile.online, "invalid_value")

	def test_update_no_changes(self):
		"""Test updating the profile with no changes."""
		url = "/users/update-profile/"
		payload = json.dumps({})
		response = self.client.put(url, payload, content_type="application/json")

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "No changes detected in the request.")
