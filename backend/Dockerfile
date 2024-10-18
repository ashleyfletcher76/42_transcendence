FROM python:3.13-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set the working directory
WORKDIR /app

# copy requirements
COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# copy the rest of the project code
COPY . /app/

RUN chmod +x /app/manage.py

# copy script and emake executable
COPY ./db/init_superuser.sh /app/init_superuser.sh
RUN chmod +x /app/init_superuser.sh

# CMD to run the init_superuser.sh script and server
CMD ["/bin/bash", "-c", "/app/init_superuser.sh && daphne -b 0.0.0.0 -p 8000 config.asgi:application"]
