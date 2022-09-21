from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signup', index),
    path('signup/authenticate/<str:email>', index),
    path('login', index),
]