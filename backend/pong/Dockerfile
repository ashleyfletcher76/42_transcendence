FROM python:3.13-slim

# Needed for PostgreSQL dev libraries
RUN apt-get update && apt-get install -y libpq-dev gcc openssl curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Generate a self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /app/server.key -out /app/server.crt -subj "/CN=localhost"

# Expose port
EXPOSE 443

# Run the dev server
CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/app/server.key", "--ssl-certfile", "/app/server.crt"]
