from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import SignupSerializer
from ..models.User import User
from django.contrib.auth.hashers import make_password
import random

class SignUpView(APIView):
    serializer_class = SignupSerializer

    def get(self, request):
        try:
            assert request.session['user'] >= 0
            error = "error_user_has_login"
            username = User.retrieveInfo(request.session['user']).username
            payload = {"error": error, "username": username}
            return Response(payload)

        except:
            payload = {"error": "OK"}
            return Response(payload)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            error = SignUpView.validateUser(username, email, password)

            if not error:
                password = make_password(password)
                user = User(username=username, password=password, email=email)
                request.session['payload'] = SignupSerializer(user).data
                request.session['payload']['auth'] = SignUpView.generateCode()
                payload = {"error": "OK"}
                return Response(payload)

            else:
                payload = {"error": error}
                return Response(payload)

    @staticmethod
    def validateUser(username, email, password):
        error = None

        if User.takenUsername(username):
            error = "error_user_taken"
        
        elif len(username) < 5:
            error = "error_user_invalid"

        elif len(email) < 5:
            error = "error_email_invalid"
        
        elif User.takenEmail(email):
            error = "error_email_taken"
        
        elif not User.validatePassword(password):
            error = "error_password_invalid"
        
        return error

    @staticmethod
    def generateCode():
        code = ''.join(["{}".format(random.randint(0, 9)) for num in range(0, 8)])
        print(code)
        return code
    
    
class EmailAuthView(APIView):
    def get(self, request):
        try:  
            if request.query_params.get('email') == request.session['payload']['email']:
                payload = {"error": "OK"}
                return Response(payload)
            else:
                error = "error_not_auth"
                payload = {"error": error}
                return Response(payload)

        except:
            error = "error_not_auth"
            payload = {"error": error}
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
            request.session.create()
            user.login(request)

            payload = {"error": "OK", "user": user.username}
            return Response(payload, status=status.HTTP_200_OK)
        
        else:
            error = "error_invalidOTP"
            payload = {"error": error}
            return Response(payload, status=status.HTTP_200_OK)

    @staticmethod
    def validateCode(code, request):
        if code == request.session['payload']['auth']:
            return True
        return False