from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..models.Item import Item, WishlistItem
from ..models.Friend import Friend
from .handlers.authentication import checkUserAuthenticationStatus

class WishlistView(APIView):
    def get(self, request):
        if checkUserAuthenticationStatus(request):
            user = User.retrieveInfo(request.session['user'])
            param = request.query_params.get('username')
            paramUser = User.queryByUsername(param)
            if not paramUser:
                error = "status_invalid_access"
                error_message = "User not found"
                payload = { "error": error, 
                            "error_message": error_message}
                return Response(payload)

            if param == user.username:
                wishlist = WishlistItem.retrieveWishlist(paramUser.id)
                if wishlist:
                    payload = { "error": "status_OK", 
                                "error_message": "NULL",
                                "isSelf": True,
                                "payload": wishlist}
                else:
                    error = "status_invalid_query"
                    error_message = "User has no wish list items"
                    payload = { "error": error, 
                                "error_message": error_message}

            elif Friend.isFriend(user.id, paramUser.id):
                wishlist = WishlistItem.retrieveWishlist(paramUser.id)
                if wishlist:
                    payload = { "error": "status_OK", 
                                "error_message": "NULL",
                                "isSelf": False,
                                "payload": wishlist}
                else:
                    error = "status_invalid_query"
                    error_message = "User has no wish list items"
                    payload = { "error": error, 
                                "error_message": error_message}
            
            else:
                error = "status_invalid_access"
                error_message = "User is not authorized to access this content."
                payload = { "error": error, 
                            "error_message": error_message }
        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { "error": error, 
                        "error_message": error_message}

        return Response(payload)
            
class AddWishlistItemView(APIView):
    def post(self, request):
        if (checkUserAuthenticationStatus(request)):
            item_id = request.data.get('item_id')
            item = Item.getItem(item_id)
            user = User.retrieveInfo(request.session['user'])
            if (WishlistItem.addedToWishlist(item, user)):
                error = "status_invalid_request"
                error_message = "Item is already in user's wishlist."
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)

            else:
                WishlistItem.addWishlistItem(item, user)
                error = "status_OK"
                error_message = "NULL"
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)

class RemoveWishlistItemView(APIView):
    def post(self, request):
        if (checkUserAuthenticationStatus(request)):
            item_id = request.data.get('item_id')
            item = Item.getItem(item_id)
            user = User.retrieveInfo(request.session['user'])
            if (WishlistItem.addedToWishlist(item, user)):
                WishlistItem.removeWishlistItem(item, user)
                error = "status_OK"
                error_message = "NULL"
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)

            else:
                error = "status_invalid_request"
                error_message = "Item is not yet in user's wishlist."
                payload = { "error": error,
                            "error_message": error_message}
                return Response(payload)
        

