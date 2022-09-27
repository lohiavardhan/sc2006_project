from django.contrib import admin
from django.urls import path

from .views.LoginView import LoginView
from .views.SignupView import AddUserView, UserView
from .views.AuthView import AuthenticateView
from .views.AccountsView import AccountsView, EditAccountsView

urlpatterns = [
    ## Every views will appear here
    path('viewsignup', UserView.as_view()),
    path('signup', AddUserView.as_view()),
    path('authenticate', AuthenticateView.as_view()),
    path('login', LoginView.as_view()),
    path('accounts', AccountsView.as_view()),
    path('accounts/edit', EditAccountsView.as_view()),
]