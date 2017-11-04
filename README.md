# A React/Redux Authentication Demo Site, using DjangoRestFramework/DjangoRestAuth

-It is a good demonstration of how to integrate react/redux with django-rest-framework to build
a fully functional web application. 

-It can also serve as a starter template for building a variety
of web applications that needs authentication.

## Backend:
   - django 1.11
   - django-rest-framework 3.7
   - django-rest-auth 0.9.2

## Frontend:
   - webpack
   - React v16
   - React Router 4
   - Redux
   - reactstrap (Bootstrap 4 components)


## How to use it

Clone the repository, which includes both backend and frontend.

## Backend: Django, Django Rest Framework and Django-Rest-Auth

cd to django_backend directory

create your virtualenv and activate (python3) 
under win: python -m venv 'envname'

run `pip install -r requirements.txt` to install all django dependencies.

run `python manage.py migrate` to migrate database.

run `python manage.py runserver` to start django development server to serve the demo site.

the backend server should be localhost:8000.

## Frontend: React/Redux

all JavaScript and html source code are within react_src directory, bundle.js will be generated in 
static/js directory. index.html will be generated in templates/project directory.

run `npm install` to install all node dependencies.

run `npm run start` to start the webpack dev server for frontend app.

now you can go to localhost:8083 to access the main page of the demo site.

## Issue Reporting

If you have found a bug or feature request, please report them at the repository issues section.

## License

MIT


