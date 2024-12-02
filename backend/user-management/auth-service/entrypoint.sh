#!/bin/bash

echo "Applying migrations"

python manage.py makemigrations

python manage.py migrate

echo "Starting the server"

exec "$@"
