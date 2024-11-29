from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class CreateRoomTest(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username="testuser", password="testpassword")
		self.client.login(username="testuser", password="testpassword")

	def test_create_room(self):
		"""Test creating a chat room through view."""
		response = self.client.post(reverse('create-room'), {'name': 'test_room'})
		self.assertEqual(response.status_code, 201)
		self.assertEqual(response.json()['name'], 'test_room')

