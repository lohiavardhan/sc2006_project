from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from .handlers.authentication import checkUserAuthenticationStatus
from ..serializers import LoginSerializer

class LoginView(APIView):
    serializer_class = LoginSerializer

    def get(self, request):
        if checkUserAuthenticationStatus(request):
            error = "status_invalid_access"
            error_message = "User is already logged in."
            username = User.retrieveInfo(request.session['user']).username
            payload = { "error": error, 
                        "error_message": error_message, 
                        "username": username }
            return Response(payload)

        else:
            error = "status_OK"
            error_message = "NULL"
            payload = { "error": error, 
                        "error_message": error_message }
            return Response(payload)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            error, error_message = User.verifyCredentials(username, password)

            if error == "status_OK":
                user = User.queryByUsername(username)
                user.login(request)
                payload = { "error": error, 
                            "error_message": error_message }
                return Response(payload)

            else:
                payload = { "error": error, 
                            "error_message": error_message }
                return Response(payload)

