from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
import json


class UserServiceTests(TestCase):
	def setUp(self):
		"""Set up test environment, including test users and authentication."""
		# create test users
		self.user1 = User.objects.create_user(username="user1", password="password")
		self.user2 = User.objects.create_user(username="user2", password="password")
		self.user3 = User.objects.create_user(username="user3", password="password")

		# create profiles for test users
		self.user1_profile = self.user1.profile
		self.user2_profile = self.user2.profile
		self.user3_profile = self.user3.profile

		# authenticate as user1
		self.client = APIClient()
		self.client.login(username="user1", password="password")
		refresh = RefreshToken.for_user(self.user1)
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

	def tearDown(self):
		"""Clean up test environment."""
		UserProfile.objects.all().delete()
		User.objects.all().delete()

	##############################
	## TEST ADD FRIEND ENDPOINT ##
	##############################

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

	##############################
	## TEST BLOCK USER ENDPOINT ##
	##############################

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

	###########################
	## TEST NICKNAME UPDATE ##
	###########################

	def test_update_nickname(self):
		"""Test updating the nickname successfully."""
		url = "/users/update-profile/"
		payload = {"nickname": "newNickname"}
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
		payload = {"nickname": "existingNickname"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.json()["success"], False)
		self.assertEqual(response.json()["message"], "Nickname is already taken.")
		self.user1_profile.refresh_from_db()
		self.assertNotEqual(self.user1_profile.nickname, "existingNickname")

	def test_invalid_nickname_update(self):
		url = "/users/update-profile/"
		payload = {"nickname": "Invalid!Name"}
		response = self.client.put(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertIn("Nickname must contain only letters and numbers.", response.data["message"])

	#########################
	## ONLINE STATUS TESTS ##
	#########################

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

	################################
	## TEST REGISTRATION ENDPOINT ##
	################################

	def test_invalid_username_registration(self):
		url = "/users/register/"
		payload = {"username": "Invalid!User", "password": "password123"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertIn(
			"Username must contain only letters and numbers.",
			str(response.data['username'][0])
		)

	#####################################
	## TEST SQL INJECTION REGISTRATION ##
	#####################################

	def test_sql_injection_username_attempts(self):
		"""Test SQL injection attempts in username field."""
		username_injection_payloads = [
			{
				"username": "user' OR '1'='1",
				"password": "password123"
			},
			{
				"username": "admin'--",
				"password": "password123"
			},
			{
				"username": "'; DROP TABLE users; --",
				"password": "password123"
			},
			{
				"username": "' UNION SELECT * FROM users; --",
				"password": "password123"
			}
		]

		url = "/users/register/"
		initial_user_count = User.objects.count()

		print("\n=== Username SQL Injection Test Results ===")
		for payload in username_injection_payloads:
			print(f"\nTesting username payload: {payload['username']}")
			response = self.client.post(url, payload)
			self.assertEqual(response.status_code, 400)
			self.assertIn(
				"Username must contain only letters and numbers.",
				str(response.data['username'][0])
			)

		final_user_count = User.objects.count()
		print(f"\nInitial user count: {initial_user_count}")
		print(f"Final user count: {final_user_count}")
		print("================================\n")
		self.assertEqual(initial_user_count, final_user_count)

	def test_sql_injection_password_attempts(self):
		"""Test SQL injection attempts in password field."""
		password_injection_payloads = [
			{
				"username": "normaluser1",
				"password": "' OR '1'='1"
			},
			{
				"username": "normaluser2",
				"password": "admin'--"
			},
			{
				"username": "normaluser3",
				"password": "'; DROP TABLE users; --"
			},
			{
				"username": "normaluser4",
				"password": "pass' UNION SELECT * FROM users --"
			}
		]

		url = "/users/register/"
		initial_user_count = User.objects.count()

		print("\n=== Password SQL Injection Test Results ===")
		for payload in password_injection_payloads:
			print(f"\nTesting password payload: {payload['password']}")
			response = self.client.post(url, payload)
			self.assertEqual(response.status_code, 400)
			# Add your password validation error check here
			# self.assertIn("Invalid password format", response.data["error"])

		final_user_count = User.objects.count()
		print(f"\nInitial user count: {initial_user_count}")
		print(f"Final user count: {final_user_count}")
		print("================================\n")
		self.assertEqual(initial_user_count, final_user_count)

	def test_sql_injection_combined_attempts(self):
		"""Test SQL injection attempts in both username and password fields."""
		combined_injection_payloads = [
			{
				"username": "'; SELECT * FROM users; --",
				"password": "'; DELETE FROM users; --"
			},
			{
				"username": "robert'; INSERT INTO users VALUES ('hacked','pwned'); --",
				"password": "pass' UNION SELECT * FROM users --"
			},
			{
				"username": "admin'--",
				"password": "' OR '1'='1"
			}
		]

		url = "/users/register/"
		initial_user_count = User.objects.count()

		print("\n=== Combined SQL Injection Test Results ===")
		for payload in combined_injection_payloads:
			print(f"\nTesting combined payload:")
			print(f"Username: {payload['username']}")
			print(f"Password: {payload['password']}")
			response = self.client.post(url, payload)
			self.assertEqual(response.status_code, 400)
			self.assertIn(
				"Username must contain only letters and numbers.",
				str(response.data['username'][0])
			)

		final_user_count = User.objects.count()
		print(f"\nInitial user count: {initial_user_count}")
		print(f"Final user count: {final_user_count}")
		print("================================\n")
		self.assertEqual(initial_user_count, final_user_count)

######################################
## Tournament Active Endpoint Tests ##
######################################

class TournamentActiveTests(TestCase):
	def setUp(self):
		"""Set up test environment, including test user and profile"""
		self.user = User.objects.create_user(username="testuser", password="password")
		self.user_profile = self.user.profile
		self.client = APIClient()
		self.client.login(username="testuser", password="password")
		refresh = RefreshToken.for_user(self.user)
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

	def tearDown(self):
		"""Clean up test environment"""
		UserProfile.objects.all().delete()
		User.objects.all().delete()

	def test_start_game_success(self):
		"""Test successfully starting a game"""
		url = "/users/tournament-active/"
		payload = {"game_name": "PongMaster", "tournament_name": "Spring Championship", "action_type": "start"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertTrue(response.data["success"])
		self.assertEqual(response.data["message"], "Game state updated successfully: start")
		self.user_profile.refresh_from_db()
		self.assertTrue(self.user_profile.game_active)
		self.assertEqual(self.user_profile.game_name, "PongMaster")
		self.assertEqual(self.user_profile.tournament_name, "Spring Championship")

	def test_end_game_success(self):
		"""Test successfully ending a game"""
		self.user_profile.game_active = True
		self.user_profile.game_name = "PongMaster"
		self.user_profile.tournament_name = "Spring Championship"
		self.user_profile.save()

		url = "/users/tournament-active/"
		payload = {"action_type": "end"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertTrue(response.data["success"])
		self.assertEqual(response.data["message"], "Game state updated successfully: end")
		self.user_profile.refresh_from_db()
		self.assertFalse(self.user_profile.game_active)
		self.assertIsNone(self.user_profile.game_name)
		self.assertIsNone(self.user_profile.tournament_name)

	def test_start_game_already_active(self):
		"""Test attempting to start a new game when one is already active"""
		self.user_profile.game_active = True
		self.user_profile.game_name = "PongMaster"
		self.user_profile.tournament_name = "Spring Championship"
		self.user_profile.save()

		url = "/users/tournament-active/"
		payload = {"game_name": "AnotherGame", "action_type": "start"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "A game is already active. Please end current game and then retry.")

	def test_start_game_missing_game_name(self):
		"""Test starting a game without providing a game_name"""
		url = "/users/tournament-active/"
		payload = {"tournament_name": "Spring Championship", "action_type": "start"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "'game_name' is required when starting a game.")

	def test_invalid_action_type(self):
		"""Test providing an invalid action_type"""
		url = "/users/tournament-active/"
		payload = {"game_name": "PongMaster", "action_type": "pause"}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "Invalid 'action_type'. Use 'start' or 'end'.")

	def test_all_fields_missing(self):
		"""Test sending a request with no fields provided"""
		url = "/users/tournament-active/"
		payload = {}
		response = self.client.post(url, payload)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(response.data["error"], "'action_type' is required and must be either 'start' or 'end'.")

	# def test_invalid_field_types(self):
	# 	"""Test sending invalid data types."""
	# 	url = "/users/tournament-active/"
	# 	payload = {"game_name": 123, "action_type": "start"}
	# 	response = self.client.post(url, payload)

	# 	self.assertEqual(response.status_code, 400)
	# 	self.assertIn("At least 'game_name' and 'action_type' must be provided.", str(response.data))
