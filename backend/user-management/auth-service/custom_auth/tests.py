from django.test import TestCase
from rest_framework.test import APIClient
from unittest.mock import patch, Mock

class AuthServiceSecurityTests(TestCase):
	def setUp(self):
		self.client = APIClient()
		self.login_url = "/auth/login/"

	@patch('custom_auth.views.login_logout_views.requests.post')
	def test_sql_injection_username_attempts(self, mock_post):
		"""Test SQL injection attempts in username field"""
		# mock the user-service response
		mock_post.return_value.status_code = 401
		mock_post.return_value.json.return_value = {"error": "Invalid login"}

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
				"username": "' UNION SELECT * FROM users --",
				"password": "password123"
			}
		]

		print("\n=== Username SQL Injection Test Results ===")
		for payload in username_injection_payloads:
			print(f"\nTesting username payload: {payload['username']}")

			response = self.client.post(self.login_url, payload)
			self.assertEqual(response.status_code, 401)
			self.assertEqual(response.json()["error"], "Invalid login")

	@patch('custom_auth.views.login_logout_views.requests.post')
	def test_sql_injection_password_attempts(self, mock_post):
		"""Test SQL injection attempts in password field"""
		mock_post.return_value.status_code = 401
		mock_post.return_value.json.return_value = {"error": "Invalid login"}

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

		print("\n=== Password SQL Injection Test Results ===")
		for payload in password_injection_payloads:
			print(f"\nTesting password payload: {payload['password']}")
			response = self.client.post(self.login_url, payload)
			self.assertEqual(response.status_code, 401)
			self.assertEqual(response.json()["error"], "Invalid login")

	@patch('custom_auth.views.login_logout_views.requests.post')
	def test_sql_injection_combined_attempts(self, mock_post):
		"""Test SQL injection attempts in both username and password fields"""
		mock_post.return_value.status_code = 401
		mock_post.return_value.json.return_value = {"error": "Invalid login"}

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

		print("\n=== Combined SQL Injection Test Results ===")
		for payload in combined_injection_payloads:
			print(f"\nTesting combined payload:")
			print(f"Username: {payload['username']}")
			print(f"Password: {payload['password']}")
			response = self.client.post(self.login_url, payload)
			self.assertEqual(response.status_code, 401)
			self.assertEqual(response.json()["error"], "Invalid login")

	#######################
	## VALID LOGIN TESTS ##
	#######################

	@patch('custom_auth.views.login_logout_views.requests.post')
	def test_valid_login(self, mock_post):
		"""Test that valid login still works, ensuring twofa_enabled is False"""

		mock_post.side_effect = [
			Mock(status_code=200, json=lambda: {"user_id": 1, "nickname": "testuser"}),

			Mock(status_code=200, json=lambda: {"twofa_enabled": False}),

			Mock(status_code=200, json=lambda: {"message": "User is online"})
		]

		payload = {
			"username": "validuser",
			"password": "validpass123"
		}

		response = self.client.post(self.login_url, payload)

		self.assertEqual(response.status_code, 200)
		self.assertIn("access", response.json())

