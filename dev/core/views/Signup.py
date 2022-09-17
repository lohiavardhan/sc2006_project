from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from ..models.User import User
from django.views import View


class Signup(View):
	@staticmethod
	def validateUser(username, email, password):
		error_message = None
		if not username:
			error_message = "Please enter a username !!"
		elif Signup.usernameExists(username):
			error_message = "Username has been taken !!"
		elif not email:
			error_message = "Please enter an email !!"
		elif Signup.emailExists(email):
			error_message = "Email has already been registered !!"
		elif not Signup.validatePassword(password):
			error_message = "Password does not satisfy the requirement !!"
	
		return error_message

	@staticmethod
	def emailExists(email):
		if User.retrieve_email(email):
			return True

		return False

	@staticmethod
	def usernameExists(username):
		if User.retrieve_username(username):
			return True
	
		return False

	@staticmethod
	def validatePassword(password):
		l, u, p, d = 0, 0, 0, 0
		if (len(password) >= 8):
			for i in password:
				if (i.islower()):
					l += 1           
				if (i.isupper()):
					u += 1           
				if (i.isdigit()):
					d += 1           
				if(i == '@'or i == '$' or i == '_'):
					p += 1          
		if (l >= 1 and u >= 1 and p >= 1 and d >= 1 and l + p + u + d == len(password)):
			return True
		else:
			return False
			
	def get(self, request):
		return render(request, 'signup.html')

	def post(self, request):
		username = request.POST.get('username')
		email = request.POST.get('email')
		password = request.POST.get('password')

		error_message = None

		error_message = self.validateUser(username, email, password)

		if not error_message:
			password = make_password(password)
			request.session['email'] = email
			request.session['password'] = password
			request.session['username'] = username
			return redirect('auth')			
		else:
			payload = {'error': error_message,}
			return render(request, 'signup.html', payload)

	