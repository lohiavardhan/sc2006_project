from django.contrib import admin
from django.urls import path

from .views.MainView import MainView, SearchItemView
from .views.FriendView import FriendView, SearchFriendView, AddFriendView, AcceptFriendView, RejectFriendView
from .views.WishlistView import WishlistView, AddWishlistItem
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
    path('v1/friends/accept', AcceptFriendView.as_view()),
    path('v1/friends/reject', RejectFriendView.as_view()),
    path('v1/main', MainView.as_view()),
    path('v1/main/search', SearchItemView.as_view()),
    path('v1/accounts/wishlist/add', AddWishlistItem.as_view()),
]