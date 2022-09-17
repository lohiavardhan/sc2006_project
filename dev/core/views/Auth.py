from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password
from ..models.User import User
from django.views import View

class Auth(View):
    @staticmethod
    def generateOTP(email):
        ## generate some OTP and send to email
        OTP = "123456"
        OTP = make_password(OTP)
        return OTP
    
    @staticmethod
    def verifyOTP(OTPsend, OTPreceive):
        if check_password(OTPreceive, OTPsend):
            return True
        
        return False

    def get(self, request):
        payload = {'email': request.session['email']}
        request.session['OTP'] = Auth.generateOTP(payload)
        return render(request, 'auth.html', payload)
    
    def post(self, request):
        OTP = request.POST.get('OTP')
        if Auth.verifyOTP(request.session['OTP'], OTP):
            newUser = User(username=request.session['username'],
					    email=request.session['email'],
						password=request.session['password'])
            newUser.register()
            request.session.clear()
            request.session['user'] = newUser.id
            return redirect('homepage')
        else:
            error_message = "Incorrect OTP !!"
            payload = {
                'error': error_message,
                'email': request.session['email']}
            return render(request, 'auth.html', payload)
        

        