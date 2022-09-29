from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from django.contrib.auth.hashers import check_password
from ..serializers import LoginSerializer

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        ## Check if the received JSON responses matches the field headers
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')

            ## Verify credentials inputted
            error = LoginView.verifyCredentials(username, password)

            ## If verified
            if not error:
                ## Retrieve the entry from database
                user = User.retrieveInfo(username)
                ## If there is not yet a session, create one
                request.session.create()
                ## Login user
                user.login(request)
                payload = {"error": "OK"}
                return Response(payload, status=status.HTTP_200_OK)

            else:
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)

    @staticmethod
    def verifyCredentials(username, password):
        error = None
        user = User.retrieveInfo(username)

        if not user or not check_password(password, user.password):
            error = "Invalid username and/or password !!"
        
        return error