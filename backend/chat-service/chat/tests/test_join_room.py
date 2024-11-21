from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from ..create_room.create_models import ChatRoom

class JoinRoomTests(TestCase):
	def setUp(self):
		"""Set up the test environment"""
		self.user = User.objects.create_user(username="testuser", password="testpassword")
		self.client.login(username="testuser", password="testpassword")
		self.room_name = "test_room"
		ChatRoom.objects.create(name=self.room_name, creator=self.user)

	def test_join_existing_room(self):
		"""Test to join an existing room"""
		response = self.client.post(reverse("join-room"), {"name": self.room_name})
		self.assertEqual(response.status_code, 200)
		self.assertIn(self.room_name, response.json())
		self.assertEqual(response.json()["status"], "success")

	def test_join_nonexisting_room(self):
		"""Test to join a nonexisting room"""
		response = self.client.post(reverse("join-room"), {"name": "nonexistent_room"})
		self.assertEqual(response.status_code, 404)
		self.assertEqual(response.json()["status"], "failure")

	def test_join_without_room_name(self):
		"""Test to join a room without a name"""
		response = self.client.post(reverse("join-room"), {})
		self.assertEqual(response.status_code, 400)
		self.assertIn("error", response.json())
