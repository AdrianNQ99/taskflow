from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        login_input = attrs.get(self.username_field, '')
        # If input looks like an email, resolve to username
        if '@' in login_input:
            try:
                user = User.objects.get(email__iexact=login_input)
                attrs[self.username_field] = user.username
            except User.DoesNotExist:
                pass  # let the parent raise the authentication error
        return super().validate(attrs)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user