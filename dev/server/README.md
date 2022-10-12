# Relevant Commands for Django

Django's commands are mostly handled by `manage.py`.

### Run Server

```console
python manage.py runserver <port-number>
```
This command initiates a localhost server on 127.0.0.1 with default port 8000.

| arg                 	| Description                                                                                     	|
|---------------------	|-------------------------------------------------------------------------------------------------	|
| &lt;port-number&gt; 	| Specifies the port number to run the localhost server on.<br>Defaults to 8000 if not specified. 	|


### Migrate Database Changes

```console
python manage.py migrate
```

This command applies staged changes to the project. Migrate frequently to ensure the project is working as intended.

*Note: You should use this in conjunction with [**Stage Database Changes**](https://github.com/lohiavardhan/sc2006_project/edit/dev/dev/server/README.md#stage-database-changes) to ensure that the changes are properly reflected.*


### Stage Database Changes

```console
python manage.py makemigrations
```

This command detects changes to the models and create a migration history. To use before [**Migrate Database Changes**](https://github.com/lohiavardhan/sc2006_project/edit/dev/dev/server/README.md#migrate-database-changes).
