from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import SignupSerializer
from ..models.User import User
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .handlers.authentication import checkUserAuthenticationStatus
import random


class SignUpView(APIView):
    serializer_class = SignupSerializer

    def get(self, request):
        if checkUserAuthenticationStatus(request):
            error = "status_invalid_access"
            error_message = "User is already logged in."
            username = User.retrieveInfo(request.session['user']).username
            payload = { "error": error, 
                        "error_messgae": error_message, 
                        "username": username }
            return Response(payload)

        else:
            error = "status_OK"
            error_message = "NULL"
            payload = { "error": error, 
                        "error_messgae": error_message }
            return Response(payload)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            error, error_message = User.validateUser(username, email, password)

            if error == "status_OK":
                password = make_password(password)
                user = User(username=username, password=password, email=email)
                request.session['payload'] = SignupSerializer(user).data
                request.session['payload']['auth'] = SignUpView.generateCode(email,username)

            payload = { "error": error, 
                        "error_message": error_message }
            return Response(payload)

    
    @staticmethod
    def generateCode(email,username):
        code = ''.join(["{}".format(random.randint(0, 9)) for num in range(0, 8)])
        subject = 'Welcome to FindR!'
        from_email = 'noreplyfindrotp@gmail.com'
        html_content = render_to_string("email_template.html",{
                    'otp':code,
                    })
        text_content = strip_tags(html_content)
        email = EmailMultiAlternatives(
                subject,
                text_content,
                from_email,
                [email]
                )
        email.attach_alternative(html_content,"text/html")
        email.send()
        print(code)
        return code
    
    
class EmailAuthView(APIView):
    def get(self, request):
        try:  
            if request.query_params.get('email') == request.session['payload']['email']:
                payload = { "error": "status_OK", 
                            "error_messgae": "NULL" }
                return Response(payload)
            else:
                error = "status_invalid_access"
                error_message = "User email does not match query parameter."
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)

        except:
            error = "status_invalid_access"
            error_message = "User email does not match query parameter."
            payload = { "error": error,
                        "error_message": error_message}
            return Response(payload)


    def post(self, request):
        code = request.data.get('code')
        username = request.session['payload']['username']
        password = request.session['payload']['password']
        email = request.session['payload']['email']

        if EmailAuthView.validateCode(code, request):
            del request.session['payload']
            user = User(username=username, password=password, email=email)
            user.register()
            user.login(request)

            payload = { "error": "status_OK", 
                        "error_message": "NULL",
                        "username": user.username}
        
        else:
            error = "status_invalid_credentials"
            error_mesasge = "Invalid OTP"
            payload = { "error": error,
                        "error_message": error_mesasge}

        return Response(payload)


    @staticmethod
    def validateCode(code, request):
        if code == request.session['payload']['auth']:
            return True
        return False