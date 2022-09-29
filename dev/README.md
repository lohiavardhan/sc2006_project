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
