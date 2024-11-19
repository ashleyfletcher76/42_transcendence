from django.test import TestCase
from django.urls import reverse

class CreateRoomTest(TestCase):
	def test_create_room(self):
		"""Test creating a chat room through view."""
		response = self.client.post(reverse('create_room'), {'room_name': 'test_room'})
		self.assertEqual(response.statuscode, 200)
		self.assertIn('test_room', response.json()['room_name'])

