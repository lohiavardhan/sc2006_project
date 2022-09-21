from django.db import models

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
