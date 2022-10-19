from ast import Return
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.Friend import Friend
from ..models.User import User
from ..serializers import AddFriendSerializer
from .handlers.authentication import checkUserAuthenticationStatus

class FriendView(APIView):
    def get(self, request):
        if checkUserAuthenticationStatus(request):
            userID = request.session['user']
            user = User.retrieveInfo(userID)
            if request.query_params.get('username') == user.username:
                error = "status_OK"
                error_message = "NULL"
                friendList = Friend.retrieveFriendList(userID)
                if len(friendList) == 0:
                    error = "status_invalid_query"
                    error_message = "User has not added any friends yet."
                payload = { "error": error, 
                            "error_message": error_message,
                            "username": user.username, 
                            "friends": friendList}
                return Response(payload)
            else:
                error = "status_invalid_access"
                error_message = "User is not authorized to access this content."
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)

        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { "error": error,
                        "error_message": error_message}
            return Response(payload)


class SearchFriendView(APIView):
    def get(self, request):
        friendUsername = request.query_params.get('username')
        userID = request.session['user']

        try:
            friend = User.queryByUsername(friendUsername)

            person = {}
            person['name'] = friend.name
            person['birthday'] = friend.birthday
            person['username'] = friend.username

            if friend.id == userID:
                error = "status_invalid_query"
                error_message = "User searched is user themselves."
                payload = { "error": error, 
                            "error_message": error_message,
                            "friend": person}

            elif Friend.isFriend(userID, friend.id):
                error = "status_invalid_query"
                error_message = "User searched is already a friend."
                payload = { "error": error, 
                            "error_message": error_message,
                            "friend": person}

            elif Friend.hasIncomingPendingRequest(userID, friend.id):
                error = "status_invalid_query"
                error_message = "User searched has an incoming pending friend request."
                payload = { "error": error, 
                            "error_message": error_message,
                            "friend": person}

            elif Friend.hasOutgoingPendingRequest(userID, friend.id):
                error = "status_invalid_query"
                error_message = "A friend request has been sent."
                payload = { "error": error, 
                            "error_message": error_message,
                            "friend": person}

            else:
                error = "status_OK"
                error_message = "NULL"
                payload = { "error": error, 
                            "error_message": error_message,
                            "friend": person}

            return Response(payload)
        
        except:
            error = "status_invalid_query"
            error_message = "User searched is not found."
            payload = { "error": error, 
                        "error_message": error_message,
                        "friend": person}

            return Response(payload)

class AddFriendView(APIView):
    serializer_class = AddFriendSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newFriendUsername = serializer.data.get('username')
            userID = request.session['user']
            newFriend = User.queryByUsername(newFriendUsername)
            Friend.addFriend(userID=userID, friendID=newFriend.id)
            payload = { "error": "OK",
                        "error_message": "NULL"}
            return Response(payload)
            

class AcceptFriendView(APIView):
    serializer_class = AddFriendSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newFriendUsername = serializer.data.get('username')
            userID = request.session['user']
            newFriend = User.queryByUsername(newFriendUsername)

            Friend.acceptFriendRequest(userID, newFriend.id)

            payload = { "error": "OK",
                        "error_message": "NULL"}
            return Response(payload)

class RejectFriendView(APIView):
    serializer_class = AddFriendSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            rejectedFriendUsername = serializer.data.get('username')
            userID = request.session['user']
            rejectedFriend = User.queryByUsername(rejectedFriendUsername)

            if Friend.rejectFriendRequest(userID, rejectedFriend.id):
                payload = { "error": "OK",
                            "error_message": "NULL"}

            else:
                error = "status_invalid_request"
                error_message = "No friend request found."
                payload = { "error": error,
                            "error_message": error_message}

            return Response(payload)