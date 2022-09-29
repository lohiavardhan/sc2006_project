from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from django.contrib.auth.hashers import check_password, make_password
from ..serializers import AuthCodeSerializer, CheckUserAuthSerializer

class AuthenticateView(APIView):
    serializer_class = AuthCodeSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            ## Code is data sent by user 
            code = request.data.get('last_code')

            ## User info is retrieved from payload stored in session
            ## Refer to SignupView 
            username = request.session['payload']['username']
            password = request.session['payload']['password']
            email = request.session['payload']['email']
            
            ## If the user inputted code matches the one sent
            if AuthenticateView.validateCode(code, request):
                ## Clear payload in session
                del request.session['payload']

                ## Create an instance of the user
                user = User(username=username, password=password, email=email, last_code=code)
                ## Register the user
                user.register()

                request.session.create()
                user.login(request)

                payload = {"error": "OK", "user": user.username}

                ## Send payload back to browser
                return Response(payload, status=status.HTTP_200_OK)
            
            else:
                error = "Incorrect OTP entered !!"
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)
    
    @staticmethod
    def validateCode(code, request):
        if code == request.session['payload']['auth']:
            return True
        return False


class CheckUserAuthView(APIView):
    serializer_class = CheckUserAuthSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = request.data.get('username')
            session_key = request.session.session_key
            user = User.retrieveInfo(username)

            if user:
                if user.userAuthenticated(session_key):
                    payload = {"error": "OK"}
                    return Response(payload, status=status.HTTP_200_OK)
                
                else:
                    error = "User not authenticated !!"
                    payload = {"error": error}
                    return Response(payload, status=status.HTTP_200_OK)
            
            else:
                error = "No record found !!"
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)
