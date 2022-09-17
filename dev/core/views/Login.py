from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib.auth.hashers import check_password
from ..models.User import User
from django.views import View
  

class Login(View):
    def get(self, request):
        return render(request, 'login.html')
  
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.get_customer_by_username(username)
        error_message = None
        if user:
            flag = check_password(password, user.password)
            if flag:
                request.session['user'] = User.id
                return redirect('homepage')
            else:
                error_message = 'Invalid Username or Password !!'
        else:
            error_message = 'Invalid Username or Password!!'
  
        payload = {'error': error_message}
        return render(request, 'login.html', payload)
  
  
def logout(request):
    request.session.clear()
    return redirect('login')