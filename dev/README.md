# React and Django

All backend files and components can be found under [```app```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/app). <br>
All frontend files and components can be found under [```client```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/client).

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
</p>

## ⭐ Getting started with Django
1. Run the following command to install Python virtual environment.
```
python -m pip install virtualenv
```

2. Navigate to the project directory and into the ```dev``` folder:
```
cd <PROJECT_DIR>/dev
```

3. Create a virtual environment in the project directory.
```
virtualenv -p python3 venv   
```

4. Activate the virtual environment:
```
venv\Scripts\activate 
```

5. Run the following command in the terminal to install Django and its dependencies:
```
python -m pip install Django
```

6. Run the server on local machine:
```
python manage.py runserver
```
7. The server is defaulted to port 8000. If you wish to change the port number, simply add the port number after the command:
```
python manage.py runserver <PORT_NUMBER>
```

8. Once the ```runserver``` command is executed, the following will be shown on the terminal window:
```
...
Django version 4.1.1, using settings 'app.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

9. Naviagate to http://127.0.0.1:8000/

10. Create a file named ```.env``` in the ```dev``` directory.

11. Naviagate to ```settings.py``` and locate the following line:
```
SECRET_KEY = "...# some string #..."
```

12. Cut the string and move it to the ```.env``` file. In the ```.env``` file, wrtie the following:
```
SECRET_KEY = "...# some string #..."    # the secret key string
```

13. Back to ```settings.py```, replace the ```SECRET_KEY``` line as:
```
SECRET_KEY = config("SECRET_KEY")
```
14. Install python-decouple in the terminal window:
```
pip install python-decouple
```

15. Import the following in the ```settings.py``` file:
```
from python-decouple import config
```

16. Finally, type the following into the terminal window. This will create a ```requirements.txt``` file which tracks all installed dependencies on the virtual environment.
```
pip freeze > requirements.txt
```

## ⭐ Getting started with React
1. Install [```node.js```](https://nodejs.org/en/).

2. Verify that the installation is successful by typing the following into the terminal window:
```
npm --version
Node --version
```

3. Install React dependencies (to-be-updated):
```
npm install react-router-dom
```

4. To show any changes made within the [```client```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/client) folder (i.e. changes to the React app), run the following command before refreshing the webpage:
```
npm run build
```
