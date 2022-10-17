from django.db import models
from .User import User
from .Item import Item
import requests
import random
from decouple import config

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
    
    def recommendItems(user, queryMegaList):
        querySet = SearchHistory.objects.filter(user=user)
        contentMegaList = []
        for i in querySet.values():
            contentMegaList.append(i['content'])

        recommendMegaList = []
        if len(contentMegaList) >= 10:
            keywords = SearchHistory.extractKeywords(contentMegaList)
            print(keywords)
            querySet = []
            querySet += Item.searchItem(keywords[0]['text'], user)
            querySet += Item.searchItem(keywords[1]['text'], user)
            querySet += Item.searchItem(keywords[2]['text'], user)
            print(querySet)
            querySet = [dict(t) for t in {tuple(d.items()) for d in querySet}]
            print(querySet, len(querySet))
            try:
                r = random.sample(range(0, len(querySet)), 3)
                for i in range(3):
                    recommendMegaList.append(querySet[r[i]])
            except:
                for i in range(len(querySet)):
                    recommendMegaList.append(querySet[i])
            
            return recommendMegaList

        else:
            return []

    def extractKeywords(content):
        url = "https://api.apilayer.com/keyword"
        body = ", ".join(content)
        payload = "%s" %(body).encode("utf-8")
        headers= {
            "apikey": config("KEYWORD_EXTRACTION_API_KEY")
        }
        response = requests.request("POST", url, headers=headers, data = payload)
        keywords = response.json()['result']
        keywords = sorted(keywords, key=lambda d: d['score'], reverse=True) 
        print(keywords)
        return keywords[0: 3]