from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..models.Item import Item
from ..models.WishlistItem import WishlistItem


class SearchItemView(APIView):
    def get(self, request):
        try:
            assert request.session['user'] >= 0
            
            keyword = request.query_params.get('keyword')  
            queryMegaList = Item.searchItem(keyword)
            payload = {"error": "OK", "result": queryMegaList}
            return Response(payload)

        except:
            error = "error_not_auth"
            keyword = request.query_params.get('keyword')
            
            queryMegaList = Item.searchItem(keyword)
            payload = {"error": error}
            return Response(payload)