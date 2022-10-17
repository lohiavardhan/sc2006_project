from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.User import User
from ..models.Item import Item
from ..models.SearchHistory import SearchHistory
from .handlers.authentication import checkUserAuthenticationStatus


class MainView(APIView):
    def get(self, request):
        if checkUserAuthenticationStatus(request):
            error = "status_OK"
            error_message = "NULL"
            username = User.retrieveInfo(request.session['user']).username
            payload = { "error": error, 
                        "error_messgae": error_message, 
                        "username": username }
            return Response(payload)

        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated."
            payload = { "error": error, 
                        "error_messgae": error_message }
            return Response(payload)



class SearchItemView(APIView):
    def get(self, request):
        if checkUserAuthenticationStatus(request):   
            keyword = request.query_params.get('keyword') 
            user = User.retrieveInfo(request.session['user']) 
            SearchHistory.addSearchHistory(keyword, user)
            queryMegaList = Item.searchItem(keyword, user)
            recommendedItems = SearchHistory.recommendItems(user, queryMegaList)
            error = "status_OK"
            error_message = "NULL"
            if len(queryMegaList) == 0:
                error = "status_invalid_query"
                error_message = "No results found."
            payload = { "error": error, 
                        "error_message": error_message, 
                        "result": queryMegaList,
                        "recommend": recommendedItems}
            return Response(payload)

        else:
            error = "status_invalid_access"
            error_message = "User is not authenticated"
            payload = { "error": error,
                        "error_message": error_message}
            return Response(payload)
