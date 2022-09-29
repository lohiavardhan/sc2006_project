# FindR

## Initialization
#### Install Python virtual environment:
```
pip install virtualenv
```

#### Verify that Python virtual environment has been installed on local machine:
```
virtualenv --version
```

#### Initialize a virtual environment under the ```dev``` sub-folder:
```
cd dev
virtualenv venv
```

#### Install all dependencies for Django in the virtual environment from ```requirements.txt```:
```
venv/scripts/activate
pip install -r requirements.txt
```

#### Install all dependencies for React in the virtual environment:
```
cd client
npm install
```

#### Include Secret Key file named `.env` under ```dev``` directory. Paste the following line into the file:
```
SECRET_KEY = 'django-insecure-### REMAINING TEXTS ARE HIDDEN FOR SECURITY MEASURE ###'
```

#### Apply existing migrations
```
python manage.py migrate
```

#### Initialize server:
```
python manage.py runserver
```

#### You should be able to see the following message on the terminal window:
```
...
System check identified no issues (0 silenced).
September 21, 2022 - 20:20:25
Django version 4.1.1, using settings 'server.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## Server API Endpoints
All APIs are built using the [Django REST framework](https://www.django-rest-framework.org).

#### Access API
Head-over to &lt;**domain**&gt;**/api/**&lt;**API**&gt; to access all APIs: <br>
| API Endpoints              	| Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	| Return Object                                                                                                                                                                                                                                               	|
|----------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `/api/login`               	| POST request should contain the following<br>fields:<br><ul><br>  <li> ***username*** </li><br>  <li> ***password*** </li><br></ul><br>Server verifies the ***password*** sent in the POST request with the hashed `password` field in the database using [`check_password`](https://docs.djangoproject.com/en/4.1/ref/contrib/auth/#django.contrib.auth.models.User.check_password) <br>from `django.contrib.auth`.<br><br>Once ***password*** is verified, server updates the `last_session` field of the user's entry in the database to be the user's current session key.<br><br>```request.session['user']``` is added by the server and contains the user's id in the database. 	| ```{"error": "OK"}``` is returned whenever login is successful.<br><br><br>```{"error": <error message>``` is returned whenever login<br>is unsuccessful.<br><br><br>`<error message>`<br><ul><br>  <li> Invalid username and/or password !! </li><br></ul> 	|
| /api/signup                	| Processes POST request for<br>registering a user<br><br>Backend checks if username and email<br>has been registered. Backend also<br>checks if password satisfies the <br>requirement.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 	| If signup successful<br>{<br>   error: "OK"<br>}<br><br>If signup fails<br>{<br>   error: &lt;error_message&gt;<br>}                                                                                                                                        	|
| /api/authenticate          	| Processes POST request for<br>handling user 2FA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        	| If authenticate successful<br>{<br>   userID: &lt;user ID in database&gt;,<br>   user: &lt;username&gt;,<br>   error: "OK"<br>}<br><br>If authenticate fails<br>{<br>   error: &lt;error_message&gt;<br>}                                                   	|
| /api/accounts              	| Processes POST request to <br>query user account details<br><br>Backend gets the username from <br>frontend and retrieve user info from<br>database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   	| If username found<br>{<br>   error: "OK"<br>   username: &lt;username&gt;<br>   email: &lt;email&gt;<br>   name: &lt;name&gt;<br>   birthday: &lt;birthday&gt;<br>}<br><br>If username not found<br>{<br>   error: "No records found!"<br>}                 	|
| /api/accounts/edit         	| Processes POST request to<br>edit user account details<br><br>Backend checks the new username and<br>new email. The username must either <br>not be within database or same as <br>user's old username. Same applies to<br>email.<br><br>Backend does not check for name and<br>birthday since they are not unique.                                                                                                                                                                                                                                                                                                                                                                    	| If edit successful<br>{<br>   error: "OK"<br>}<br><br>If edit fails<br>{<br>   error: &lt;error_message&gt;<br>}                                                                                                                                            	|
| /api/accounts/authenticate 	| Processes POST request to check if <br>user is authenticated.<br><br>Backend checks the last session key<br>of user in database and attempts to<br>match with the current user<br>session key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         	| If authentication is successful<br>{<br>   error: "OK"<br>}<br><br>If authentication fails<br>{<br>   error: &lt;error_message&gt;<br>}                                                                                                                     	|
| /api/accounts/logout       	| Process POST request to log a user<br>out.<br><br>Backend clears the last session key<br>of user in database. That way, any <br>attempts of authentication will fail<br>until user re-login and assign new<br>session key into the database.                                                                                                                                                                                                                                                                                                                                                                                                                                           	| If logout is successful<br>{<br>   error: "OK"<br>}<br><br>If logout fails<br>{<br>   error: &lt;error_message&gt;<br>}                                                                                                                                     	|
