from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..serializers import EditAccountDetailsSerializer
from .handlers.authentication import checkUserAuthenticationStatus

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
                            "error_message": error_message}
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