from django.contrib import admin
from django.urls import path

from .views.WishlistView import WishlistView
from .views.LoginView import LoginView
from .views.SignupView import AddUserView
from .views.AuthView import AuthenticateView, CheckUserAuthView
from .views.AccountsView import AccountsView, EditAccountsView, LogoutAccountView

urlpatterns = [
    ## Every views will appear here
    path('signup', AddUserView.as_view()),
    path('authenticate', AuthenticateView.as_view()),
    path('accounts/authenticate', CheckUserAuthView.as_view()),
    path('login', LoginView.as_view()),
    path('accounts', AccountsView.as_view()),
    path('accounts/edit', EditAccountsView.as_view()),
    path('accounts/logout', LogoutAccountView.as_view()),
    path('accounts/wishlist', WishlistView.as_view()),
]