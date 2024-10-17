from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'password']

	def create(self, validated_data):
		# Hash the password before saving the user
		validated_data['password'] = make_password(validated_data['password'])
		return super(UserSerializer, self).create(validated_data)
