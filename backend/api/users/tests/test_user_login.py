# test_user_login.py

from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from django.contrib.auth.models import User

class UserLoginTest(TestCase):
	def setUp(self):
		self.client = APIClient()
		# create a test user
		self.test_user = User.objects.create_user(username='testuser', password='password123')
		self.login_url = reverse('token_obtain_pair')

	def test_login_user_success(self):
		"""Test logging in a user with valid credentials"""
		data = {
			'username': 'testuser',
			'password': 'password123'
		}
		response = self.client.post(self.login_url, data)

		# ensure the login is successful
		self.assertEqual(response.status_code, 200)
		self.assertIn('access', response.data)
		self.assertIn('refresh', response.data)

	def test_login_user_invalid_password(self):
		"""Test logging in a user with an invalid password"""
		data = {
			'username': 'testuser',
			'password': 'wrongpassword'
		}
		response = self.client.post(self.login_url, data)

		# ensure the login fails with incorrect password
		self.assertEqual(response.status_code, 401)
		self.assertIn('detail', response.data)
		self.assertEqual(response.data['detail'], 'No active account found with the given credentials')

	def test_login_user_invalid_username(self):
		"""Test logging in with an invalid username"""
		data = {
			'username': 'nonexistentuser',
			'password': 'password123'
		}
		response = self.client.post(self.login_url, data)

		# ensure the login fails with incorrect username
		self.assertEqual(response.status_code, 401)
		self.assertIn('detail', response.data)
		self.assertEqual(response.data['detail'], 'No active account found with the given credentials')
