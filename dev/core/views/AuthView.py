from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..models.AuthCode import AuthCode
from django.contrib.auth.hashers import check_password, make_password
from ..serializers import AuthCodeSerializer

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
            if AuthenticateView.validateCode(code):
                ## Create an instance of the user
                user = User(username=username, password=password, email=email)
                ## Register the user
                user.register()

                ## Create an instance of the authentication code
                userAuth = AuthCode(user=user, last_code=code)
                ## Register (this shows that user has been verified)
                userAuth.register()

                ## Clear payload in session
                request.session.clear()

                ## Add user id to session for authentication
                request.session['user'] = user.id
                payload = {"userID": user.id, "error": "OK", "user": username}

                ## Send payload back to browser
                return Response(payload, status=status.HTTP_200_OK)
            
            else:
                error = "Incorrect OTP entered !!"
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)
    
    @staticmethod
    def validateCode(code):
        if check_password(code, make_password("123456")):
            return True
        return False
