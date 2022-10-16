from django.db import models
from django.db.models import Q
from ..models.User import User

class Item(models.Model):
    item_name = models.CharField(max_length=500)
    item_description = models.CharField(max_length=5000)
    purchasable = models.BooleanField(null=False, default=True)
    platform = models.TextField(max_length=50, null=False)
    url = models.TextField(max_length=2048, null=False)
    deliveryFee = models.FloatField(null=False)
    rating = models.FloatField(null=False)

    def __str__(self):
        return self.item_name

    @staticmethod
    def getItem(item_id):
        return Item.objects.get(id=item_id)

    def serializeItem(self, user):
        serialized = {}
        serialized['id'] = self.id
        serialized['item_name'] = self.item_name
        serialized['description'] = self.item_description
        serialized['purchasable'] = self.purchasable
        serialized['platform'] = self.platform
        serialized['url'] = self.url
        serialized['deliveryFee'] = self.deliveryFee
        serialized['rating'] = self.rating
        if WishlistItem.addedToWishlist(self, user):
            serialized['addedToWishlist'] = True
        else:
            serialized['addedToWishlist'] = False
        return serialized

    def searchItem(keyword, user):
        queryMegaList = []
        try:
            if " " in keyword:
                keyword = keyword.split()
                for i in keyword:
                    itemList = Item.objects.filter( Q(item_name__icontains=i) | 
                                                    Q(item_description__icontains=i))
                    for j in itemList:
                        queryMegaList.append(j.serializeItem(user))

            else:
                itemList = Item.objects.filter( Q(item_name__icontains=keyword) | 
                                                Q(item_description__icontains=keyword))
                for j in itemList:
                    queryMegaList.append(j.serializeItem(user))

            queryMegaList = [dict(t) for t in {tuple(d.items()) for d in queryMegaList}]

        except:
            if " " in keyword:
                keyword = keyword.split()
                for i in keyword:
                    itemList = Item.objects.filter( Q(item_name__icontains=i) | 
                                                    Q(item_description__icontains=i))
                    for j in itemList:
                        queryMegaList.append(j.serializeItem(user))

            else:
                itemList = Item.objects.filter( Q(item_name__icontains=keyword) | 
                                                Q(item_description__icontains=keyword))
                for j in itemList:
                    queryMegaList.append(j.serializeItem(user))

        return queryMegaList


class WishlistItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    session_key = models.TextField(max_length=150, null=False)

    def __str__(self):
        return self.item.item_name

    ## Query the database to see if the item 'name' has already been added by the user 'username'
    @staticmethod
    def addedToWishlist(item, user):
        if not (WishlistItem.objects.filter(item=item, user=user).count()):
            return False
        return True

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