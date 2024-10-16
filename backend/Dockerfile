# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt to the container
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Django project code to the container
COPY . /app/

# Ensure all files are executable and correct permissions
RUN chmod +x /app/manage.py

# Run migrations and collect static files as part of the image build process
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000"]
