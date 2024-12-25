from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import MatchHistory
import os


class BaseTestSetup(APITestCase):
	"""Base class to set up reusable configurations for all tests"""

	@classmethod
	def setUpClass(cls):
		os.environ["DJANGO_SECRET_KEY"] = "test-secret-key"
		super().setUpClass()

	def create_user(self, username, password="password"):
		"""Helper to create a user"""
		return User.objects.create_user(username=username, password=password)

	def authenticate_user(self, user):
		"""Helper to authenticate a user"""
		self.client = APIClient()
		self.client.force_authenticate(user=user)


class MatchHistoryTests(BaseTestSetup):
	"""Tests for match history retrieval"""

	def setUp(self):
		self.user1 = self.create_user("player1")
		self.user2 = self.create_user("player2")

		# create match history for user1
		self.match_history = MatchHistory.objects.create(
			user_id=self.user1.id,
			trophies=10,
			games_total=5,
			wins=3,
			losses=2
		)
		self.authenticate_user(self.user1)

	def test_get_match_history_success(self):
		"""Test retrieving an existing user's match history"""
		response = self.client.get(f"/match/get-match-history/?user_id={self.user1.id}")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, {
			"games_total": 5,
			"wins": 3,
			"losses": 2,
			"trophies": 10,
			"history": []
		})

	def test_get_nonexistent_match_history(self):
		"""Test retrieving match history for a nonexistent user"""
		response = self.client.get("/match/get-match-history/?user_id=999")
		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

	def test_get_match_history_missing_user_id(self):
		"""Test retrieving match history without providing user_id"""
		response = self.client.get("/match/get-match-history/")
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class MatchDetailTests(BaseTestSetup):
	"""Tests for adding match details"""

	def setUp(self):
		self.user1 = self.create_user("player1")
		self.user2 = self.create_user("player2")

		self.match_history = MatchHistory.objects.create(
			user_id=self.user1.id,
			trophies=0,
			games_total=0,
			wins=0,
			losses=0
		)
		self.authenticate_user(self.user1)

	def test_add_match_win(self):
		"""Test adding a winning match"""
		payload = {
			"opponent": "player2",
			"result": "win",
			"score": "10-8",
			"tournament": True,
		}
		response = self.client.post("/match/add-match-history/", data=payload)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		self.match_history.refresh_from_db()
		self.assertEqual(self.match_history.games_total, 1)
		self.assertEqual(self.match_history.wins, 1)
		self.assertEqual(self.match_history.trophies, 1)

	def test_add_match_loss(self):
		"""Test adding a losing match"""
		payload = {
			"opponent": "player2",
			"result": "loss",
			"score": "8-10",
			"tournament": False,
		}
		response = self.client.post("/match/add-match-history/", data=payload)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		self.match_history.refresh_from_db()
		self.assertEqual(self.match_history.games_total, 1)
		self.assertEqual(self.match_history.losses, 1)
		self.assertEqual(self.match_history.trophies, 0)

	def test_add_match_invalid_data(self):
		"""Test adding a match with invalid data"""
		invalid_payloads = [
			{},  # empty
			{"opponent": "player2"},  # missing fields
			{
				"opponent": "player2",
				"result": "invalid",
				"score": "10-8"},  # invalid result
			{
				"opponent": "player2",
				"result": "win",
				"score": "invalid"},  # invalid score
		]
		for payload in invalid_payloads:
			response = self.client.post("/match/add-match-history/",
								data=payload,
								format="json")
			self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class BatchTrophyTests(BaseTestSetup):
	"""Tests for batch trophy retrieval"""

	def setUp(self):
		self.users = []
		self.trophy_counts = [5, 10, 0, 15]

		for i, trophies in enumerate(self.trophy_counts):
			user = self.create_user(f"player{i}")
			self.users.append(user)
			MatchHistory.objects.create(user_id=user.id, trophies=trophies)

		self.authenticate_user(self.users[0])

	def test_batch_trophy_retrieval_success(self):
		"""Test retrieving trophies for multiple users"""
		user_ids = [user.id for user in self.users]
		response = self.client.post(
			"/match/batch-trophies/",
			data={"user_ids": user_ids},
			format="json"
		)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		for user, expected_trophies in zip(self.users, self.trophy_counts):
			self.assertEqual(response.data[str(user.id)], expected_trophies)

	def test_batch_trophy_invalid_users(self):
		"""Test retrieving trophies for invalid user IDs"""
		response = self.client.post(
			"/match/batch-trophies/",
			data={"user_ids": [999, 998]},
			format="json"
		)
		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

	def test_batch_trophy_invalid_request(self):
		"""Test batch trophy retrieval with invalid request data."""
		invalid_payloads = [
			{},  # empty
			{"user_ids": "not_a_list"},  # invalid data type
			{"wrong_field": [1, 2, 3]},  # wqrong field name
		]
		for payload in invalid_payloads:
			response = self.client.post("/match/batch-trophies/", data=payload)
			self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
