from django.db import models
from core.models.User import User

class WishlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.TextField(max_length=100)
    item_description = models.TextField(max_length=250)
    item_price = models.FloatField(default=0.0)

    def __str__(self):
        return self.user
    
    @staticmethod
    def retrieveWishList(user):
        return WishlistItem.objects.filter(user=user)
    
    def addToWishlist(self):
        self.save()