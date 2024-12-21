from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.validators import RegexValidator, MinLengthValidator

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
