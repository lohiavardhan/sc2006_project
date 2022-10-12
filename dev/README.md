# FindR

## Initialization
### Installing Dependencies
1. Install the Python virtual environment:
   *  ```console
      pip install virtualenv 
      ```

   *  Verify that the installation is successful: 
      *  ```console
         virtualenv --version 
         ```
2. Install [node.js](https://nodejs.org/en/download/). 
   *  Verify that the installation is successful:
      *  ```console
         npm --version
         ```

3. Create a virtual environment under *dev* sub-directory:
   *  ``` console
      cd dev
      virtualenv venv
      ```

4. Install the required dependencies for Django. The requirements can be found in `requirements.txt`.
   *  For **Windows**:
      *  ```console
         venv/scripts/activate
         pip install -r requirements.txt
         ```
   *  For **MacOS/Linux**:
      *  ```console
         source venv/lib/activate
         pip install -r requirements.txt
         ```
         
5. Include a Secret Key file named `.env` under *dev* sub-directory. Paste the following line into the file:
   *  ```console
      SECRET_KEY = 'django-insecure-### REMAINING TEXTS ARE HIDDEN FOR SECURITY MEASURE ###'
      ```


### Applying Migrations
1. Run the following command to apply existing migrations to the database:
   *  ```console
      cd ..
      python manage.py migrate --run-syncdb
      python manage.py migrate
      ```

### Initializing Server
1. Run the following command to start the server at localhost:8000.
   *  ```console
      python manage.py runserver
      ```


2. You should be able to see the following message on the terminal window:
   *  ```console
      ...
      System check identified no issues (0 silenced).
      September 21, 2022 - 20:20:25
      Django version 4.1.1, using settings 'server.settings'
      Starting development server at http://127.0.0.1:8000/
      Quit the server with CTRL-BREAK.
      ```
