from rest_framework import serializers
from .models.User import User
from .models.Item import Item, WishlistItem

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class ForgetPassSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class EditAccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'birthday')

class AddFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']