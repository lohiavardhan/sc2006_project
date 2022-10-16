from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..models.WishlistItem import WishlistItem


class WishlistView(APIView):
    def get(self, request):
        try:
            assert request.session['user'] >= 0
            user = User.retrieveInfo(request.session['user'])
            if request.query_params.get('username') == user.username:
                wishlist = WishlistItem.retrieveWishlist(request.session['user'])
                if wishlist:
                    payload = {"error": "OK", "payload": wishlist}
                    return Response(payload)
                
                else:
                    error = "error_wishlist_invalid"
                    payload = {"error": error}
                    return Response(payload)
            else:
                error = "error_not_auth"
                payload = {"error": error}
                return Response(payload)

        except:
            error = "error_not_auth"
            payload = {"error": error}
            return Response(payload)
            
        