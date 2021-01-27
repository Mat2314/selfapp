#!/bin/bash

# Make migrations / migrate and collect staticfiles
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn selfapp.wsgi.application --bind 0.0.0.0:8899
