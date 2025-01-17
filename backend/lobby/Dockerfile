FROM python:3.13-slim

RUN apt-get update && apt-get install -y \
    libpq-dev gcc openssl curl zsh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=config.settings

WORKDIR /app

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/


# Expose port
EXPOSE 8000


CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
