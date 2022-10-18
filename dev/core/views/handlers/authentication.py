def checkUserAuthenticationStatus(request):
    try:
        assert request.session['user'] >= 0
        return True
    except:
        return False


