import random
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..serializers import EditAccountDetailsSerializer, ForgotPasswordSerializer, LoginSerializer
from .handlers.authentication import checkUserAuthenticationStatus
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth.hashers import make_password

class AccountsView(APIView):
    def get(self, request):
        if checkUserAuthenticationStatus(request):
            user = User.retrieveInfo(request.session['user'])
            if request.query_params.get('username') == user.username:
                error = "status_OK"
                error_message = "NULL"
                payload = { "error": error, 
                            "error_message": error_message,
                            "username": user.username, 
                            "email": user.email, 
                            "name": user.name, 
                            "birthday": user.birthday}
            else:
                error = "status_invalid_access"
                error_message = "User is not authorized to access this content."
                payload = { "error": error,
                            "error_message": error_message}

        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { "error": error,
                        "error_message": error_message}

        return Response(payload)


class EditAccountsView(APIView):
    serializer_class = EditAccountDetailsSerializer
    def get(self, request):
        if checkUserAuthenticationStatus(request):
            user = User.retrieveInfo(request.session['user'])
            if request.query_params.get('username') == user.username:
                error = "status_OK"
                error_message = "NULL"
                payload = { "error": error, 
                            "error_message": error_message,
                            "username": user.username, 
                            "email": user.email, 
                            "name": user.name, 
                            "birthday": user.birthday}
            else:
                error = "status_invalid_access"
                error_message = "User is not authorized to access this content."
                payload = { "error": error,
                            "error_message": error_message} 
        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { "error": error,
                        "error_message": error_message}

        return Response(payload)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            name = serializer.data.get('name')
            birthday = serializer.data.get('birthday')

            user = User.retrieveInfo(request.session['user'])
            old_username = user.username
            old_email = user.email
            
            if (not User.takenUsername(username) or username == old_username) and (not User.takenEmail(email) or email == old_email):
                user.updateParticulars(name, email, username, birthday)
                payload = { 'error': "status_OK",
                            "error_message": "NULL"}

            elif User.takenUsername(username) and username != old_username:
                error = "status_invalid_request"
                payload = { 'error': error,
                            "error_message": "Username has been taken."}

            elif User.takenEmail(email) and email != old_email:
                error = "status_invalid_request"
                payload = { 'error': error,
                            "error_message": "Email has been registered."}

            return Response(payload)


class LogoutAccountView(APIView):
    def post(self, request):
        try:
            user = User.retrieveInfo(request.session['user'])
            user.logout(request)
            payload = { 'error': "OK",
                        "error_message": "NULL"}
            return Response(payload)

        except:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { 'error': error,
                        "error_message": error_message}
            return Response(payload)


class ForgotPasswordView(APIView):
    serializer_class = ForgotPasswordSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            user = User.queryByEmail(email)
            if user:
                request.session['payload'] = {}
                request.session['payload']['email'] = email
                request.session['payload']['auth'] = ForgotPasswordView.generateCode(email)

                error = "status_OK"
                error_message = "NULL"
                payload = {"error": error, "error_message": error_message}
            
            else:
                error = "status_invalid_request"
                error_message = "Email address is not registered to any user."
                payload = {"error": error, "error_message": error_message}

            return Response(payload)

    @staticmethod
    def generateCode(email):
        code = ''.join(["{}".format(random.randint(0, 9)) for num in range(0, 8)])
        subject = '[FindR] Password Change Request'
        from_email = 'noreplyfindrotp@gmail.com'
        html_content = render_to_string("forgot_password.html",{
                    'otp':code,
                    'email':email,
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


class EmailAuthForgotPassView(APIView):
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

        if EmailAuthForgotPassView.validateCode(code, request):
            payload = { "error": "status_OK", 
                        "error_message": "NULL"}
        
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


class UpdateCredentialsView(APIView):
    serializer_class = LoginSerializer
    def get(self, request):
        try:
            if request.session['payload']['email'] == request.query_params.get('email'):
                payload = { "error": "status_OK", 
                            "error_message": "NULL"}
            else:
                payload = { "error": "status_invalid_access", 
                        "error_message": "User is not authorized to access this content."}
        except:
            payload = { "error": "status_invalid_access", 
                        "error_message": "User is not authorized to access this content."}
        
        return Response(payload)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            email = request.session['payload']['email']

            user = User.queryByEmail(email)
            old_username = user.username
            error = "status_OK"

            if (not User.takenUsername(username) or old_username == username):      
                payload = { 'error': error,
                            "error_message": "NULL"}

            elif User.takenUsername(username):
                error = "status_invalid_request"
                payload = { 'error': error,
                            "error_message": "Username has been taken."}

            if not User.validatePassword(password):
                error = "status_invalid_request"
                payload = { 'error': error,
                            "error_message": "Password does not meet minimum requirements."}

            if error == "status_OK":
                password = make_password(password)
                user.updateCredentials(username, password)

            return Response(payload)
