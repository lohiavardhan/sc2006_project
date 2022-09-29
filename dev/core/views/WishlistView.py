from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import ViewWishlistSerializer
from ..models.User import User
from ..models.WishlistItem import WishlistItem


class WishlistView(APIView):
    serializer_class = ViewWishlistSerializer

    def post(self, request, format=None):
        ## Serialize the requested data into JSON objects
        serializer = self.serializer_class(data=request.data)

        ## Check if the received JSON responses matches the field headers
        if serializer.is_valid():
            ## Assign the received responses to their respective variables
            username = serializer.data.get('user')
            wishlist = WishlistItem.retrieveWishlist(username)
            if wishlist:
                payload = {"error": "OK", "payload": wishlist.values()}
                return Response(payload, status=status.HTTP_200_OK)
            
            else:
                error = "No item added to wishlist yet !!"
                payload = {"error": error}
                return Response(payload, status=status.HTTP_200_OK)
        