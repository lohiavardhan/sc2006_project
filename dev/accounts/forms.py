from django.forms import ModelForm
from django import forms
from .models import User

class SignUpForm(ModelForm):
    username = forms.TextInput()
    password = forms.TextInput()

    class Meta:
        model = User
        fields = ["username", "password"]