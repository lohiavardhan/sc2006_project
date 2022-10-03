from urllib import request
from django.db import models
from .Friend import Friend

class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    last_session = models.CharField(max_length=50)   
    name = models.CharField(max_length=50, null=True)
    birthday = models.DateField(null=True)

    def __str__(self):
        return self.username

    ## Function called when user is registered
    ## Saves the instance to the database
    def register(self):
        self.save()

    ## Adds a key in the session which contains the user id during login
    ## Saves the instance to update the last_login field
    def login(self, request):
        self.last_session = request.session.session_key
        request.session['user'] = self.id
        self.save()

    def logout(self, request):
        self.last_session = "null"
        request.session.clear()
        self.save()

    def updateParticulars(self, name, email, username, birthday):
        self.name = name
        self.username = username
        self.birthday = birthday
        self.email = email
        self.save()

    ## Function to retrieve a queryset of a user's friend list.
    ## The queryset will retrieve the id of friends
    ## If user has no friend, then return None
    def getUserFriendList(self):
        user = User.objects.get(username= self.username)

        try:
            queryset = Friend.objects.filter(userID=user.id)
            return queryset

        except:
            return None
    
    def userAuthenticated(self, session_key):
        if self.last_session == session_key:
            return True
        
        return False

    ## Helper function to check if username is taken during registration
    @staticmethod
    def takenUsername(username):
        try:
            if User.objects.get(username= username):
                return True
        except:
            return False
    
    ## Helper function to check if email is taken during registration
    @staticmethod
    def takenEmail(email):
        try:
            if User.objects.get(email= email):
                return True
        except:
            return False

    ## Helper function to check password is secure during registration
    @staticmethod
    def validatePassword(password):
        l, u, p, d = 0, 0, 0, 0

        if (len(password) >= 8):
            for i in password:
        
                # counting lowercase alphabets
                if (i.islower()):
                    l += 1           
        
                # counting uppercase alphabets
                if (i.isupper()):
                    u += 1           
        
                # counting digits
                if (i.isdigit()):
                    d += 1           
        
                # counting the mentioned special characters
                if(i == '@' or i == '$' or i == '_'):
                    p += 1   

        if (l >= 1 and u >= 1 and p >= 1 and d >= 1 and l + p + u + d == len(password)):
            return True
        else:
            return False

    ## Retrieve an entry from the database based on username
    ## If not found, return False
    @staticmethod
    def retrieveInfo(id):
        try:
            return User.objects.get(id=id)
        except:
            return False

    @staticmethod
    def queryByUsername(username):
        try:
            return User.objects.get(username=username)
        except:
            return False
    
    @staticmethod
    def queryByEmail(email):
        try:
            return User.objects.get(email=email)
        except:
            return False
