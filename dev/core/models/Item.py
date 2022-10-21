from django.db import models
from django.db.models import Q
from ..models.User import User

class Item(models.Model):
    item_name = models.CharField(max_length=500)
    item_description = models.CharField(max_length=10000)
    purchasable = models.BooleanField(null=False, default=True)
    platform = models.TextField(max_length=50, null=False)
    image_url = models.TextField(max_length=2048, null=False)
    item_url = models.TextField(max_length=2048, null=False)
    deliveryFee = models.FloatField(null=False)
    rating = models.FloatField(null=False)
    num_of_ratings = models.IntegerField(null=False)
    price = models.FloatField(null=False)
    discounted_price = models.FloatField(null=False)

    def __str__(self):
        return self.item_name

    @staticmethod
    def getItem(item_id):
        return Item.objects.get(id=item_id)

    def serializeItem(self, user):
        serialized = {}
        serialized['id'] = self.id
        serialized['item_name'] = self.item_name
        serialized['item_price'] = self.price
        serialized['item_discounted_price'] = self.discounted_price
        serialized['description'] = self.item_description
        serialized['purchasable'] = self.purchasable
        serialized['platform'] = self.platform
        serialized['item_url'] = self.item_url
        serialized['image_url'] = self.image_url
        serialized['deliveryFee'] = self.deliveryFee
        serialized['rating'] = self.rating
        serialized['numOfRating'] = self.num_of_ratings
        if WishlistItem.addedToWishlist(self, user):
            serialized['addedToWishlist'] = True
        else:
            serialized['addedToWishlist'] = False
        return serialized

    def searchItem(keyword, user):
        queryMegaList = []    
        itemList = Item.objects.filter( Q(item_name__icontains=keyword) | 
                                        Q(item_description__icontains=keyword))
        pageSize = 0
        pageCount = 0
        for j in itemList:
            j = j.serializeItem(user)
            if pageSize < 10:
                j['page'] = pageCount
                pageSize += 1
            else:
                j['page'] = pageCount + 1
                pageSize = 0
                pageCount += 1

            queryMegaList.append(j)
        queryMegaList = [dict(t) for t in {tuple(d.items()) for d in queryMegaList}]
        return queryMegaList
    
    def parameterTuning(tuningKey, user, keyword): 
        filteredList = Item.searchItem(keyword, user)
        if tuningKey['platform'] != 'ALL': 
            filteredList = [x for x in filteredList if tuningKey['platform'] == x.get('platform')]
        if tuningKey['deliveryFee'] != 'ALL':
            filteredList = [x for x in filteredList if tuningKey['deliveryFee'] >= x.get('deliveryFee')]
        if tuningKey['rating'] != 'ALL':
            filteredList = [x for x in filteredList if tuningKey['rating'] <= x.get('rating')]
        if tuningKey['discounted_price'] != 'ALL':
            filteredList = [x for x in filteredList if tuningKey['discounted_price'] >= x.get('discounted_price')]
        return filteredList


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
            i['item'] = item.serializeItem(user)
            del i['user_id']
            modifiedQuerySet.append(i)

        return modifiedQuerySet
    
    def addWishlistItem(item, user):
        newWishlistItem = WishlistItem(user=user, item=item, session_key=user.last_session)
        newWishlistItem.save()

    def removeWishlistItem(item, user):
        WishlistItem.objects.get(item=item, user=user).delete()
        