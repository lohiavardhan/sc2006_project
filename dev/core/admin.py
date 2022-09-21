from django.contrib import admin
from .models.AuthCode import AuthCode
from .models.Friend import Friend
from .models.User import User
from .models.WishlistItem import WishlistItem

# Register your models here.
admin.site.register(WishlistItem)
admin.site.register(User)
admin.site.register(Friend)
admin.site.register(AuthCode)