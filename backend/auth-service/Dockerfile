FROM python:3.13-slim

# needed for PostgreSQL dev libraries
RUN apt-get update && apt-get install -y libpq-dev gcc openssl curl && \
	apt-get clean && rm -rf /var/lib/apt/lists/*

# set environent variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set working directory
WORKDIR /app

# copy requirements
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# copy the rest
COPY . /app/

# generate a self signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /app/server.key -out /app/server.crt -subj "/CN=localhost"

# expose port
EXPOSE 443

# run dev server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver_plus --cert-file /app/server.crt --key-file /app/server.key 0.0.0.0:443"]
