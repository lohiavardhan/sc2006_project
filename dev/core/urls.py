from django.contrib import admin
from django.urls import path
from .views.LoginView import LoginView
from .views.SignupView import AddUserView, UserView
from .views.AuthView import AuthenticateView

urlpatterns = [
    ## Every views will appear here
    path('viewsignup', UserView.as_view()),
    path('signup', AddUserView.as_view()),
    path('authenticate', AuthenticateView.as_view()),
    path('login', LoginView.as_view()),
]