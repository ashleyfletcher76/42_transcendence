FROM python:3.13-slim

# Needed for PostgreSQL dev libraries
RUN apt-get update && apt-get install -y \
    libpq-dev gcc openssl curl zsh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=config.settings

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 8000

ENTRYPOINT [ "/app/entrypoint.sh" ]

CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--reload"]
