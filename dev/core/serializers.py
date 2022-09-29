from rest_framework import serializers
from .models.User import User
from .models.WishlistItem import WishlistItem

class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    
class AuthCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['last_code']

class CheckUserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class AccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class EditAccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'birthday')

class LogoutAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class ViewWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = ['user']