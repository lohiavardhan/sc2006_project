from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from django.contrib.auth.hashers import check_password
from ..serializers import LoginSerializer

class LoginView(APIView):
    serializer_class = LoginSerializer
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
            password = serializer.data.get('password')

            error = LoginView.verifyCredentials(username, password)

            if not error:
                user = User.queryByUsername(username)
                request.session.create()
                user.login(request)
                payload = {"error": "OK"}
                return Response(payload)

            else:
                payload = {"error": error}
                return Response(payload)

    @staticmethod
    def verifyCredentials(username, password):
        error = None
        user = User.queryByUsername(username)

        if not user or not check_password(password, user.password):
            error = "error_user"
        
        return error