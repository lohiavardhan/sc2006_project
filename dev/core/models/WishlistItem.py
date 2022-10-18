from django.db import models
from .User import User

class WishlistItem(models.Model):
    ## name of the wishlist item 
    item_name = models.CharField(max_length=1000, null=False)
    ## user of which the wishlist item belongs to
    user = models.CharField(max_length=50, null=False)
    ## a boolean value to check whether the wishlist item is still up for sale
    purchasable = models.BooleanField(null=False, default=True)
    ## time when the wishlist item is added
    added_at = models.DateTimeField(auto_now_add=True)
    ## the session ID when the item is added to wishlist
    session_key = models.TextField(max_length=150, null=False)

    platform = models.TextField(max_length=50, null=False)

    url = models.TextField(max_length=2048, null=False)

    def __str__(self):
        return self.item_name

    ## Query the database to see if the item 'name' has already been added by the user 'username'
    @staticmethod
    def added_to_wishlist(name, username):
        if not (WishlistItem.objects.filter(item_name= name, user= username).count()):
            return True
        return False

    @staticmethod
    def retrieveWishlist(id):
        user = User.retrieveInfo(id)
        return WishlistItem.objects.all().filter(user=user.username)