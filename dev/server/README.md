# Relevant Commands

### python manage.py runserver <port-number>
This command initiates a localhost server on 127.0.0.1 with default port 8000. You may change the port number following the syntax above.
> e.g. <br>
> ```python manage.py runserver 1000``` will run the server at port 1000.

### python manage.py migrate
This command applies detected changes to the project. Migrate frequently to ensure the project is working as intended.

* Whenever a new model class is added, head over to the app's ```admin.py``` file and type the following:
```
from <appname>.models.<modelname> import <modelname>

admin.site.register(<modelname>)
```

* Run ```python manage.py migrate``` to make sure Django knows that this model class exists.

### python manage.py startapp <app-name>
This command creates a Django app in the current directory. An example of a Django app in our project is [```core```](https://github.com/lohiavardhan/sc2006_project/tree/dev/dev/core)

### python manage.py dbshell
This command allows access to the SQLite database pre-installed with Django.