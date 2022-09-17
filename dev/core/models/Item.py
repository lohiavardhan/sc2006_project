from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField(default=0)
    description= models.CharField(max_length=250, default='', blank=True, null=True)
    platform = models.CharField(max_length=50)
    delivery = models.FloatField(default=0)
    rating = models.FloatField(default=0)
    rebate = models.FloatField(default=0)
    image = models.ImageField(upload_to='products/')

    @staticmethod
    def get_item_by_id(ids):
        return Item.objects.filter(id__in=ids)

    @staticmethod
    def get_all_items():
        return Item.objects.all()
    
    