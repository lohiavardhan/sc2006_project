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
            if param == user.username or Friend.isFriend(user.id, paramUser.id):
                wishlist = WishlistItem.retrieveWishlist(paramUser.id)
                if wishlist:
                    payload = { "error": "status_OK", 
                                "error_message": "NULL",
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
            
class AddWishlistItem(APIView):
    def post(self, request):
        item_id = request.data.get('item_id')
        item = Item.getItem(item_id)

