from django.db import models
  
  
class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=100)
  
    # to save the data
    def register(self):
        self.save()

    def __str__(self):
        return self.username
  
    @staticmethod
    def get_customer_by_email(email):
        try:
            return User.objects.get(email=email)
        except:
            return False

    @staticmethod
    def get_customer_by_username(username):
        try:
            return User.objects.get(username=username)
        except:
            return False
  
    def emailExists(self):
        if User.objects.filter(email=self.email):
            return True
  
        return False
    
    def usernameExists(self):
        if User.objects.filter(username=self.username):
            return True
        
        return False