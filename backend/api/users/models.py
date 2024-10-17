from django.db import models

class User(models.Model):
	username = models.CharField(max_length=50, unique=True)
	password = models.CharField(max_length=100)
	created_at = models.DateTimeField(auto_now_add=True)

	def _str_(self):
		return self.username
