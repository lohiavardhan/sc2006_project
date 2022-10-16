from django.db import models
from .User import User

class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)

    # check if the user's search history has reached the limit
    # only save the last 50 searches of a user
    @staticmethod
    def checkIfFull(user):
        querySet = SearchHistory.objects.filter(user=user)
        if querySet.count() == 50:
            return True
        return False
    
    # adds a search history to the database
    # check if history is full first
    # delete oldest entry if full and insert the new entry
    def addSearchHistory(keyword, user):
        searchHistory = SearchHistory(user=user, content=keyword)
        if SearchHistory.checkIfFull(user):
            SearchHistory.objects.get(user=user).delete()
        searchHistory.save()
    

