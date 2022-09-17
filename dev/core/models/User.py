from django.db import models
import json
  
class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=100)
  
    def register(self):
        self.save()

    def login(self, request):
        request.session['user'] = self.id

    def logout(self, request):
        request.session.clear()

    def __str__(self):
        return self.username
  
    @staticmethod
    def retrieve_email(email):
        try:
            return User.objects.get(email=email)
        except:
            return False

    @staticmethod
    def retrieve_username(username):
        try:
            return User.objects.get(username=username)
        except:
            return False

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)