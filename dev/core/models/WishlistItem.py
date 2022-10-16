from django.db import models
from .User import User
from .Item import Item

class WishlistItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    session_key = models.TextField(max_length=150, null=False)

    def __str__(self):
        return self.item.item_name

    ## Query the database to see if the item 'name' has already been added by the user 'username'
    @staticmethod
    def added_to_wishlist(name, username):
        if not (WishlistItem.objects.filter(item_name= name, user= username).count()):
            return True
        return False

    @staticmethod
    def retrieveWishlist(id):
        user = User.retrieveInfo(id)
        querySet =  WishlistItem.objects.all().filter(user=user)
        modifiedQuerySet = []

        for i in querySet.values():
            item = Item.getItem(i['item_id'])
            del i['item_id']
            i['item'] = item.serializeItem()
            del i['user_id']
            modifiedQuerySet.append(i)

        return modifiedQuerySet