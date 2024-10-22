FROM python:3.13-slim

# install PostgreSQL development libraries
RUN apt-get update && apt-get install -y libpq-dev gcc && \
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

# expose the port for WebSocket and Django
EXPOSE 8000

# cmd to run the Django Channels server (Daphne)
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "config.asgi:application"]
