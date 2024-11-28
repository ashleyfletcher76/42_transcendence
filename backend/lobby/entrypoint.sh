#!/bin/bash

echo "migrations setting up"

python manage.py makemigrations

python manage.py migrate

exec "$@"