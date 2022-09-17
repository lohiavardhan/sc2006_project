from django.shortcuts import render, redirect
from django.contrib.auth.hashers import check_password
from ..models.User import User
from django.views import View
  

class Login(View):
    @staticmethod
    def verifyCredentials(user, password):
        if user:
            flag = check_password(password, user.password)
            if flag:
                return True
            else:
                return False
        else:
            return False
            
    def get(self, request):
        return render(request, 'login.html')
  
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.retrieve_username(username)

        if Login.verifyCredentials(user, password):
            user.login(request)
            return redirect('homepage')
        else:
            error_message = 'Invalid Username or Password !!'
        payload = {'error': error_message}
        return render(request, 'login.html', payload)

    