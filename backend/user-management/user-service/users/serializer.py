from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ["display_name", "avatar", "bio"]

class UserSerializer(serializers.ModelSerializer):
	profile = UserProfileSerializer(required=False)

	class Meta:
		model = User
		fields = ["username", "password", "profile"]

	def create(self, validated_data):
		profile_data = validated_data.pop("profile", {})
		user = super(UserSerializer, self).create(validated_data)
		user.set_password(validated_data["password"])
		user.save()
		# UserProfile.objects.create(user=user, **profile_data)
		return user

