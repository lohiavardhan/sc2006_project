# React and Django

All backend files and components can be found under [```server```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/server). <br>
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

5. Install dependencies from ```requirements.txt```
```
pip install -r requirements.txt
```

6. Once done, exit the virtual environment by typing:
```
deactivate
```

7. Create an ```.env``` file under the ```dev``` directory and type the following into the ```.env``` file:
```
SECRET_KEY = "## Some string value ##"      # Get the string value from the admin of the django server
```



## ⭐ Getting started with React
1. Install [```node.js```](https://nodejs.org/en/).

2. Verify that the installation is successful by typing the following into the terminal window:
```
npm --version
Node --version
```

3. Naviagate to the ```client``` folder in the ```dev``` directory:
```
cd client
```

4. Install React dependencies:
```
npm install
```

5. To show any changes made within the [```client```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/client) folder (i.e. changes to the React app), run the following command before refreshing the webpage:
```
npm run build
```

6. Once completed, navigate back to the ```dev``` directory:
```
cd ../
```

7. Activate the virtual environment:
```
venv\Scripts\activate 
```

8. Perform initial migration:
```
python maange.py migrate
```

9. Run the server on local machine:
```
python manage.py runserver
```
10. The server is defaulted to port 8000. If you wish to change the port number, simply add the port number after the command:
```
python manage.py runserver <PORT_NUMBER>
```

11. Once the ```runserver``` command is executed, the following will be shown on the terminal window:
```
...
Django version 4.1.1, using settings 'app.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

12. Naviagate to http://127.0.0.1:8000/

