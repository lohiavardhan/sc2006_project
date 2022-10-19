from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@ensure_csrf_cookie
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def indexHelp(request, *args, **kwargs):
    return render(request, 'frontend/Help.html')