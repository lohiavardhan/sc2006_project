from django.contrib import admin
from django.urls import path

from .views.FriendView import FriendView, SearchFriendView, AddFriendView
from .views.WishlistView import WishlistView
from .views.LoginView import LoginView
from .views.SignupView import SignUpView, EmailAuthView
from .views.AccountsView import AccountsView, EditAccountsView, LogoutAccountView

urlpatterns = [
    ## Every views will appear here
    path('v1/accounts', AccountsView.as_view()),
    path('v1/accounts/signup', SignUpView.as_view()),
    path('v1/accounts/signup/authenticate', EmailAuthView.as_view()),
    path('v1/accounts/login', LoginView.as_view()),
    path('v1/accounts/edit', EditAccountsView.as_view()),
    path('v1/accounts/logout', LogoutAccountView.as_view()),
    path('v1/accounts/wishlist', WishlistView.as_view()),
    path('v1/friends/view', FriendView.as_view()),
    path('v1/friends/search', SearchFriendView.as_view()),
    path('v1/friends/add', AddFriendView.as_view()),
]