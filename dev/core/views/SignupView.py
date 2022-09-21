from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import UserSerializer, AddUserSerializer
from ..models.User import User
from django.contrib.auth.hashers import make_password

class UserView(generics.ListAPIView):
    ## A set of all entries in the database
    queryset = User.objects.all()
    ## Serailise the entries into JSON data
    serializer_class = UserSerializer

class AddUserView(APIView):
    serializer_class = AddUserSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        ## Check if the received JSON responses matches the field headers
        if serializer.is_valid():
            ## Assign the received responses to their respective variables
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            ## Validate if the inputs meet the constraints
            error = AddUserView.validateUser(username, email, password)

            if not error:
                ## Hash password
                password = make_password(password)
                ## Create instance of user
                user = User(username=username, password=password, email=email)
                ## User session to store data for authentication page
                request.session['payload'] = AddUserSerializer(user).data
                ## No error detected
                payload = {"error": "OK"}
                ## Send back the browser the payload
                return Response(payload, status=status.HTTP_200_OK)

            else:
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)

    @staticmethod
    def validateUser(username, email, password):
        error = None

        if User.takenUsername(username):
            error = "Username has been taken !!"
        
        elif len(username) < 5:
            error = "Username must have a minimum of 5 characters !!"

        elif len(email) < 5:
            error = "Invalid email address !!"
        
        elif User.takenEmail(email):
            error = "Email has been registered !!"
        
        elif not User.validatePassword(password):
            error = "Password does not satisfy requirements !!"
        
        return error
        