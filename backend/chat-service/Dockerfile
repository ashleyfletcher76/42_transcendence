FROM python:3.13-slim

# install PostgreSQL development libraries
RUN apt-get update && apt-get install -y libpq-dev gcc openssl curl iputils-ping postgresql-client && \
	apt-get clean && rm -rf /var/lib/apt/lists/*

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set the working directory
WORKDIR /app

# copy requirements.txt and install deps
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# copy the rest
COPY . /app/

# # generate a self signed SSL certificate
# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
# 	-keyout /app/server.key -out /app/server.crt -subj "/CN=localhost"

# expose the port for WebSocket and Django
EXPOSE 8000

# cmd to run the Django Channels server (uvicorn)
CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]

