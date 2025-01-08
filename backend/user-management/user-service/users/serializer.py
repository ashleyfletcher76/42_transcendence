from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.validators import RegexValidator, MinLengthValidator
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
	username = serializers.RegexField(
		regex=r'^[a-zA-Z0-9]*$',
		error_messages={
			"invalid": "Username must contain only letters and numbers.",
		}
	)

	password = serializers.CharField(
		write_only=True,
		validators=[
			MinLengthValidator(2, message="Password must be at least 2 characters long"),
			RegexValidator(
				regex=r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{2,}$',
				message="Password must contain both letters and numbers."
			),
		]
	)

	class Meta:
		model = User
		fields = ["username", "password"]

	def validate_username(self, value):
		"""Check that the username is unique."""
		if User.objects.filter(username=value).exists():
			raise serializers.ValidationError("A user with that username already exists.")
		return value

	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data["username"],
			password=make_password(validated_data["password"]),
		)
		return user

class UserProfileSerializer(serializers.ModelSerializer):
	friends = serializers.SerializerMethodField()
	blocker_users = serializers.SerializerMethodField()

	class Meta:
		model = UserProfile
		fields = [
			'user', 'nickname', 'avatar',
			'bio', 'friends', 'blocked_users',
			'online', 'last_seen', 'game_active',
			'tournament_name', 'game_name',
		]

	def get_friends(self, obj):
		return list(obj.friends.value_list('nickname', flat=True))

	def get_blocked_users(self, obj):
		return list(obj.blocked_users.value_list('nickname', flat=True))
