# Inside test_user_registration.py
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse

class UserRegistrationTest(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_register_user(self):
		data = {
			'username': 'testuser',
			'password': 'password123'
		}
		response = self.client.post(reverse('user-register'), data)
		self.assertEqual(response.status_code, 201)

