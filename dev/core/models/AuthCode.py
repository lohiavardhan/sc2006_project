from tkinter import CASCADE
from django.db import models
from .User import User

class AuthCode(models.Model):
    ## Stores the instance of a user model
    ## When user is deleted, delete this entry as well
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    ## Stores the last authentication code used
    ## Can be used to check if user has been verified
    ## If user can be found in the database, then user is verified
    last_code = models.CharField(max_length=8)

    ## Save the instance to database
    def register(self):
        self.save()

    def __str__(self):
        return self.user.username