from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..serializers import EditAccountDetailsSerializer

class AccountsView(APIView):
    def get(self, request):
        try:
            assert request.session['user'] >= 0
            user = User.retrieveInfo(request.session['user'])
            if request.query_params.get('username') == user.username:
                error = "OK"
                payload = {"error": error, "username": user.username, "email": user.email, "name": user.name, "birthday": user.birthday}
                return Response(payload)
            else:
                error = "error_not_auth"
                payload = {"error": error}
                return Response(payload)

        except:
            error = "error_not_auth"
            payload = {"error": error}
            return Response(payload)


class EditAccountsView(APIView):
    serializer_class = EditAccountDetailsSerializer
    def get(self, request):
        try:
            assert request.session['user'] >= 0
            user = User.retrieveInfo(request.session['user'])
            if request.query_params.get('username') == user.username:
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
                payload = {'error': "OK"}
                return Response(payload, status=status.HTTP_200_OK) 

            elif User.takenUsername(username) and username != old_username:
                error = "error_user_taken"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)

            elif User.takenEmail(email) and email != old_email:
                error = "error_email_taken"
                payload = {'error': error}
                return Response(payload, status=status.HTTP_200_OK)


class LogoutAccountView(APIView):
    def post(self, request):

        try:
            user = User.retrieveInfo(request.session['user'])
            user.logout(request)
            payload = {'error': "OK"}
            return Response(payload)

        except:
            error = "error_not_auth"
            payload = {'error': error}
            return Response(payload)