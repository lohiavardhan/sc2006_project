from ast import Return
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.Friend import Friend
from ..models.User import User
from ..serializers import AddFriendSerializer

class FriendView(APIView):
    def get(self, request):
        try:
            assert request.session['user'] >= 0
            userID = request.session['user']
            user = User.retrieveInfo(userID)
            if request.query_params.get('username') == user.username:
                error = "OK"
                friendList = Friend.retrieveFriendList(userID)
                payload = {"error": error, "username": user.username, "friends": friendList}
                return Response(payload)
            else:
                error = "error_not_auth"
                payload = {"error": error}
                return Response(payload)

        except:
            error = "error_not_auth"
            payload = {"error": error}
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
                error = "error_is_self"
                payload = {"error": error, "friend": person}

                return Response(payload)

            if Friend.isFriend(userID, friend.id):
                error = "error_is_friend"

                payload = {"error": error, "friend": person}
                return Response(payload)
            
            else:
                error = "OK"

                payload = {"error": error, "friend": person}
                return Response(payload)
        
        except:
            error = "error_user_invalid"
            payload = {"error": error}
            return Response(payload)


class AddFriendView(APIView):
    serializer_class = AddFriendSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newFriendUsername = serializer.data.get('username')
            userID = request.session['user']
            newFriend = User.queryByUsername(newFriendUsername)

            if newFriend.id == userID:
                error = "error_is_self"
                payload = {"error": error}

                return Response(payload)

            if Friend.isFriend(userID, newFriend.id):
                error = "error_is_friend"

                payload = {"error": error}
                return Response(payload)
            
            else:
                friendConnection = Friend(userID=userID, friendID=newFriend.id)
                friendConnection.addFriend()

                payload = {"error": "OK"}
                return Response(payload)
            
