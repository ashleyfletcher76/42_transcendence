FROM python:3.13-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set the working directory
WORKDIR /app

# copy the requirements
COPY requirements.txt /app/

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg2-binary

# copy the rest of the Django project code
COPY . /app/

RUN chmod +x /app/manage.py

# copy the init_superuser.sh script into the container and make it executable
COPY ./db/init_superuser.sh /app/init_superuser.sh
RUN chmod +x /app/init_superuser.sh

# CMD to run the init_superuser.sh script first, then start the Django server
CMD ["/bin/bash", "-c", "/app/init_superuser.sh && python manage.py runserver 0.0.0.0:8000"]
