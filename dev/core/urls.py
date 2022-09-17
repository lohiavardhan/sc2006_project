from django.contrib import admin
from django.urls import path
from .views.Signup import Signup
from .views.Login import Login
  
urlpatterns = [
    path('signup', Signup.as_view(), name='signup'),  
    path('login', Login.as_view(), name='login'),
]