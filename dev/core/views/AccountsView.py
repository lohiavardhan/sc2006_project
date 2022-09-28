from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..serializers import AccountDetailsSerializer, EditAccountDetailsSerializer, LogoutAccountSerializer

class AccountsView(APIView):
    serializer_class = AccountDetailsSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ## Assign the received responses to their respective variables
            username = serializer.data.get('username')
            user = User.retrieveInfo(username)

            if user:
                if user.userAuthenticated(request.session.session_key):
                    payload = {'error': "OK", 'username': username, 'email': user.email, 'name': user.name, 'birthday': user.birthday}
                    return Response(payload, status=status.HTTP_200_OK)

                else:
                    payload = {'error': "User not authenticated!"}
                    return Response(payload, status=status.HTTP_200_OK)

            else:
                error = "No records found !"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)


class EditAccountsView(APIView):
    serializer_class = EditAccountDetailsSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            ## Assign the received responses to their respective variables
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            name = serializer.data.get('name')
            birthday = serializer.data.get('birthday')

            user = User.objects.get(id=request.session['user'])
            old_username = user.username
            old_email = user.email
            
            if (not User.takenUsername(username) or username == old_username) and (not User.takenEmail(email) or user.email == old_email):
                user = User.retrieveInfo(old_username)
                user.updateParticulars(name, email, username, birthday)
                payload = {'error': "OK"}
                return Response(payload, status=status.HTTP_200_OK) 

            elif User.takenUsername(username):
                error = "Username has been taken !!"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)

            elif User.takenEmail(email):
                error = "Email has been taken !!"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)


class LogoutAccountView(APIView):
    serializer_class = LogoutAccountSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            user = User.retrieveInfo(username)

            if user:
                if user.userAuthenticated(request.session.session_key):
                    user.logout()
                    payload = {'error': "OK"}
                    return Response(payload, status=status.HTTP_200_OK)

                else:
                    payload = {'error': "User not authenticated!"}
                    return Response(payload, status=status.HTTP_200_OK)

            else:
                error = "No records found !"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)