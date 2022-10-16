from django.db import models
from django.db.models import Q

        
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

    def serializeItem(self):
        serialized = {}
        serialized['id'] = self.id
        serialized['item_name'] = self.item_name
        serialized['description'] = self.item_description
        serialized['purchasable'] = self.purchasable
        serialized['platform'] = self.platform
        serialized['url'] = self.url
        serialized['deliveryFee'] = self.deliveryFee
        serialized['rating'] = self.rating

        return serialized

    def searchItem(keyword):
        queryMegaList = []
        if " " in keyword:
            keyword = keyword.split()
            for i in keyword:
                itemList = Item.objects.filter(Q(item_name__icontains=i) | Q(item_description__icontains=i))
                for j in itemList:
                    queryMegaList.append(j.serializeItem())


        else:
            itemList = Item.objects.filter(Q(item_name__icontains=keyword) | Q(item_description__icontains=keyword))
            for j in itemList:
                queryMegaList.append(j.serializeItem())

        queryMegaList = [dict(t) for t in {tuple(d.items()) for d in queryMegaList}]
        return queryMegaList
        