from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..serializers import AccountDetailsSerializer, EditAccountDetailsSerializer

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
                payload = {'error': "OK", 'username': username, 'email': user.email, 'name': user.name, 'birthday': user.birthday}
                return Response(payload, status=status.HTTP_200_OK)

            else:
                payload = {'error': "No records found!"}
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

            old_username = User.objects.get(id=request.session['user']).username

            if not User.takenUsername(username) and not User.takenEmail(email):
                user = User.retrieveInfo(old_username)
                user.updateParticulars(name, email, username, birthday)
                print(user)
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