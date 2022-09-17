from django.contrib import admin
from django.urls import path
from .views.Signup import Signup
from .views.Login import Login
from .views.Auth import Auth

urlpatterns = [
    path('signup', Signup.as_view(), name='signup'),  
    path('login', Login.as_view(), name='login'),
    path('auth', Auth.as_view(), name='auth'),
]