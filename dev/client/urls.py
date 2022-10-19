from django.urls import path
from .views import index, indexHelp

urlpatterns = [
    path('', index),
    path('signup', index),
    path('signup/authenticate/<str:email>', index),
    path('login', index),
    path('forget', index),
    path('register', index),
    path('help', indexHelp),
    path('accounts/<str:username>', index),
    path('accounts/<str:username>/edit', index),
    path('accounts/<str:username>/wishlist', index),
    path('accounts/<str:username>/friends/view', index),
    path('home', index)
]