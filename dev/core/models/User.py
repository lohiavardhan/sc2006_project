from django.db import models
from .Friend import Friend

class User(models.Model):
    ## Username of the user;
    ## Maximum length is 50 characters;
    username = models.CharField(max_length=50)

    ## Email of the user;
    ## Maximum length is 50 characters;
    email = models.CharField(max_length=50)

    ## Hashed password of the user;
    ## Maximum length is 100 characters (due to hashing);
    ## Hashing will be done using Django's own hasher and hash checker
    password = models.CharField(max_length=100)

    ## Datetime value of when the account is first created;
    ## auto_now_add only updates this field the first time model is created;
    created_at = models.DateTimeField(auto_now_add=True)

    ## Datetime value of when the last login occured;
    ## auto_now updates this field whenever instance.save() is called.
    last_login = models.DateTimeField(auto_now=True)

    ## Session key for each session;
    ## Use this to authenticate user so they dont have to relogin every refresh;
    last_session = models.CharField(max_length=50)

    def __str__(self):
        return self.username

    ## Function called when user is registered
    ## Saves the instance to the database
    def register(self):
        self.save()

    ## Adds a key in the session which contains the user id during login
    ## Saves the instance to update the last_login field
    def login(self, request):
        request.session['user'] = self.id
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
    def retrieveInfo(username):
        try:
            return User.objects.get(username=username)
        except:
            return False