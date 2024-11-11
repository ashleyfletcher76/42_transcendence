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

# Expose port
EXPOSE 8000

# Run the dev server
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py 0.0.0.0:8000"]
