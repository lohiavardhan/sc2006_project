from django.shortcuts import render
from .forms import SignUpForm
from .models import User

# Create your views here.
def signUp(request):
    form = SignUpForm(request.POST, request.POST)
    payload = {"form": form}
    return render(request, "./accounts/register.html", payload)