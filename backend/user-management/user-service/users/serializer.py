from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
	nickname = serializers.RegexField(
		regex=r'^[a-zA-Z0-9]*$',
		error_messages={
			"invalid": "Nickname must contain only letters and numbers.",
		}
	)

	class Meta:
		model = UserProfile
		fields = ["nickname", "avatar", "bio"]


class UserSerializer(serializers.ModelSerializer):
	profile = UserProfileSerializer(required=False)
	username = serializers.RegexField(
		regex=r'^[a-zA-Z0-9]*$',
		error_messages={
			"invalid": "Username must contain only letters and numbers.",
		}
	)

	class Meta:
		model = User
		fields = ["username", "password", "profile"]

	def create(self, validated_data):
		profile_data = validated_data.pop("profile", {})
		# create the User instance
		user = User(
			username=validated_data["username"],
			password=make_password(validated_data["password"]),
		)
		user.save()

		# ff profile data is provided, create the UserProfile
		if profile_data:
			UserProfile.objects.create(user=user, **profile_data)

		return user
