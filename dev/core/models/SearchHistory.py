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
            SearchHistory.objects.filter(user=user).order_by('id')[0].delete()
        searchHistory.save()
    
    def recommendItems(user):
        querySet = SearchHistory.objects.filter(user=user)
        contentMegaList = []
        for i in querySet.values():
            contentMegaList.append(i['content'])

        recommendMegaList = []
        if len(contentMegaList) >= 10:
            keywords = SearchHistory.extractKeywords(contentMegaList)
            print(keywords)
            querySet = []
            for i in range(len(keywords)):
                querySet += Item.searchItem(keywords[i]['text'], user)[0]

            querySet = [dict(t) for t in {tuple(d.items()) for d in querySet}]
            try:
                r = random.sample(range(0, len(querySet)), 3)
                for i in range(3):
                    recommendMegaList.append(querySet[r[i]])
            except:
                for i in range(len(querySet)):
                    recommendMegaList.append(querySet[i])
            
            print(recommendMegaList)
            return recommendMegaList

        else:
            return []

    def extractKeywords(content):
        try:
            url = "https://api.apilayer.com/keyword"
            body = ", ".join(content)
            payload = "%s" %(body).encode("utf-8")
            headers= {
                "apikey": config("KEYWORD_EXTRACTION_API_KEY")
            }
            response = requests.request("POST", url, headers=headers, data = payload)
            keywords = response.json()['result']
            keywords = sorted(keywords, key=lambda d: d['score'], reverse=True) 
            return keywords[0: 3]
        
        except:
            uniqueKeywords = set(content)
            keywords = []
            for i in uniqueKeywords:
                keywords.append({
                    "text": i,
                    "score": content.count(i),
                })
            
            keywords = sorted(keywords, key=lambda d: d['score'], reverse=True) 
            if len(keywords) < 3:
                return keywords
            return keywords[0: 3]