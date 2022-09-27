from rest_framework import serializers
from .models.User import User
from .models.AuthCode import AuthCode

## Serializer to serialize GET or POST responses into JSON objects
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        ## fields must match field in database
        ## how many fields depends on which data needs to be processed
        fields = ('id', 'username', 'email', 'password', 'created_at', 'last_login')

class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    
class AuthCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthCode
        fields = ['last_code']

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