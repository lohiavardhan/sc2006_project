from urllib import request
from django.db import models
from .User import User

class Friend(models.Model):
    ## The database relationship is many-to-many
    ## So we use a lookup table to store the user ID and friend ID
    ## There can be more than one same user ID per column, same for friend ID
    ## Assume symmetric relationship, i.e. if A is friend with B, then B is friend with A
    ## So if entry {userID: 0, friendID: 1} is in database, 
    ##      then {userID: 1, friendID: 0} must also be in database


    ## ID of a user
    userID = models.IntegerField(null=False)
    ## ID of a user's friend
    friendID = models.IntegerField(null=False)

    ## check if friend request is accepted
    request = models.BooleanField(null=False)

    @staticmethod
    def retrieveFriendList(userID):
        querySet = Friend.objects.filter(userID=userID)
        friendList = []
        count = 0
        for i in querySet.values():
            friend = User.retrieveInfo(i['friendID'])
            _friend = {}
            if i['request']:
                _friend['accepted'] = True
            else:
                _friend['accepted'] = False
            _friend['requested'] = False
            _friend['id'] = count
            _friend['username'] = friend.username
            _friend['name'] = friend.name
            _friend['birthday'] = friend.birthday
            count += 1   
            friendList.append(_friend)

        querySet = Friend.objects.filter(friendID=userID, request=False)
        count = 0
        for i in querySet.values():
            friend = User.retrieveInfo(i['userID'])
            _friend = {}
            _friend['accepted'] = False
            _friend['requested'] = True
            _friend['id'] = count
            _friend['username'] = friend.username
            _friend['name'] = friend.name
            _friend['birthday'] = friend.birthday
            count += 1   
            friendList.append(_friend)
    
        friendList = sorted(friendList, key=lambda d: d['requested']) 
        friendList = sorted(friendList, key=lambda d: d['accepted']) 
        return friendList
    
    @staticmethod
    def isFriend(userID, friendID):
        try:
            connection = Friend.objects.get(userID=userID, friendID=friendID, request=True)
            return connection
        except:
            return False
    
    def hasOutgoingPendingRequest(userID, friendID):
        try:
            Friend.objects.get(userID=friendID, friendID=userID, request=False)
            return True

        except:
            return False
    
    def hasIncomingPendingRequest(userID, friendID):
        try:
            Friend.objects.get(userID=userID, friendID=friendID, request=False)
            return True

        except:
            return False

    @staticmethod
    def addFriend(userID, friendID):
        friendEntry = Friend(userID=friendID, friendID=userID, request=False)
        friendEntry.save()

    @staticmethod
    def acceptFriendRequest(userID, friendID):
        userEntry = Friend.objects.get(userID=userID, friendID=friendID)
        userEntry.request = True
        userEntry.save()
        friendEntry = Friend(userID=friendID, friendID=userID, request=True)
        friendEntry.save()

    @staticmethod
    def rejectFriendRequest(userID, friendID):
        try:
            Friend.objects.get(userID=userID, friendID=friendID).delete()
            return True
        except:
            return False