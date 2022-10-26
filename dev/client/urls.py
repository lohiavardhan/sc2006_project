from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signup', index),
    path('signup/authenticate/<str:email>', index),
    path('login', index),
    path('login/forgetpassword', index),
    path('login/forgetpassword/authenticate/<str:email>', index),
    path('login/forgetpassword/update/<str:email>', index),
    path('accounts/<str:username>', index),
    path('accounts/<str:username>/edit', index),
    path('accounts/<str:username>/wishlist', index),
    path('accounts/<str:username>/friends/view', index),
    path('accounts/<str:username>/friends/add', index),
    path('home', index),
    path('help', index),
    path('about', index),
]