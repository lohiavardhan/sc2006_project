from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signup', index),
    path('signup/authenticate/<str:email>', index),
    path('login', index),
    path('accounts/<str:username>', index),
    path('accounts/<str:username>/edit', index),
    path('accounts/<str:username>/wishlist', index),
    path('accounts/<str:username>/friends/view', index),
    path('home', index),
    path('help', index),
]