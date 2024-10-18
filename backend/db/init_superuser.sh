#!/bin/bash

# Run migrations
python manage.py migrate

# Marker file to check if the superuser has been created
MARKER_FILE="/app/.superuser_created"

# Create superuser only if not already created
if [ ! -f "$MARKER_FILE" ]; then
    if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
        exists=$(python manage.py shell -c "from django.contrib.auth.models import User; print('EXISTS') if User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() else print('NOT_EXISTS')")

        if [ "$exists" != "EXISTS" ]; then
            python manage.py createsuperuser --noinput --username "$DJANGO_SUPERUSER_USERNAME" --email "$DJANGO_SUPERUSER_EMAIL"
            echo "Superuser created."

            # Set the superuser's password
            python manage.py shell -c "from django.contrib.auth.models import User; \
            user = User.objects.get(username='$DJANGO_SUPERUSER_USERNAME'); \
            user.set_password('$DJANGO_SUPERUSER_PASSWORD'); \
            user.save();"

            # Create the marker file to indicate that initialization has been done
            touch "$MARKER_FILE"
        else
            echo "Superuser already exists."
        fi
    fi
else
    echo "Superuser initialization already done, skipping..."
fi

# python manage.py runserver 0.0.0.0:8000
