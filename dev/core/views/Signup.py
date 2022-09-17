from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from ..models.User import User
from django.views import View


class Signup (View):
	def get(self, request):
		return render(request, 'signup.html')

	def post(self, request):
		postData = request.POST
		username = postData.get('username')
		email = postData.get('email')
		password = postData.get('password')

		# validation
		value = {
			'username': username,
			'email': email
		}
		error_message = None

		newUser = User(username=username,
					    email=email,
						password=password)

		error_message = self.validateUser(newUser)

		if not error_message:
			print(username, email, password)
			newUser.password = make_password(newUser.password)
			newUser.register()
			return redirect('security', newUser)			
		else:
			data = {
				'error': error_message,
				'values': value
			}
			return render(request, 'signup.html', data)

	def validateUser(self, user):
		def passwordCheck(password):
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

		error_message = None
		if not user.username:
			error_message = "Please enter a username !!"
		elif user.usernameExists():
			error_message = "Username has been taken !!"
		elif not user.email:
			error_message = "Please enter an email !!"
		elif user.emailExists():
			error_message = "Email has already been registered !!"
		elif not passwordCheck(user.password):
			error_message = "Password does not satisfy the requirement !!"
	
		return error_message
