# A ReactJS Authentication Demo Site, using django-rest-auth as backend

This demo demonstrate how to build a simple authentication system using ReactJS + React Router + Flux. It also shows
that ReactJS can be integrated with django easily with browerify and gulp.

The ReactJS is modified based on this [repository](https://github.com/auth0/react-flux-jwt-authentication-sample).


## How to use it

Clone the repository, which is a django project. All reactjs part is under react_src directory.

## Django, Django Rest Framework and Django-Rest-Auth

create your virtualenv and activate (python3) 
under win: python -m venv 'envname'

run `pip install -r requirements.txt` to install all django dependencies

run `python manage.py migrate` to migrate database

run `python manage.py runserver` to start django development server to serve the demo site

## JavaScript

all JavaScript and html source code are within react_src directory, bundle.js will be generated in 
static/js directory. index.html will be generated in templates/project directory.

run `npm install` to install all node dependencies

run `gulp` to build the app script (bundle.js) which will be in static/js directory, and start watching changes. index.html will be
generated in templates/project directory.

run `gulp build` to build without watch

now you can go to localhost:8000 to access the main page of the demo site

## Issue Reporting

If you have found a bug or feature request, please report them at the repository issues section.

## License

MIT


