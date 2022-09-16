# React and Django

All backend files and components can be found under [```app```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/app). <br>
All frontend files and components can be found under [```client```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/client).

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
</p>

## ⭐ Getting started with Django
1. Run the following command in the terminal to install Django and its dependencies:
```
python -m pip install Django
```

2. Navigate to the project directory and into the *dev* folder:
```
cd <PROJECT_DIR>/dev
```

3. Run the server on local machine:
```
python manage.py runserver
```
4. The server is defaulted to port 8000. If you wish to change the port number, simply add the port number after the command:
```
python manage.py runserver <PORT_NUMBER>
```

5. Once the ```runserver``` command is executed, the following will be shown on the terminal window:
```
...
Django version 4.1.1, using settings 'app.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

6. Naviagate to http://127.0.0.1:8000/

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
