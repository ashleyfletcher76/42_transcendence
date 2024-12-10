import os
import sys
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY settings
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
DEBUG = os.environ.get("DJANGO_DEBUG") == "True"
ALLOWED_HOSTS = ["*"]
ASGI_APPLICATION = "config.asgi.application"

# Set to True to ensure all connections are HTTPS
SECURE_SSL_REDIRECT = False

# Prevent man in the middle attacks
SECURE_HSTS_SECONDS = 0  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# Only allow cookies to be sent over HTTPS
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Prevent the browser from guessing the content type
SECURE_CONTENT_TYPE_NOSNIFF = True

# Enable the browser XSS protection
SECURE_BROWSER_XSS_FILTER = True

REDIS_URL = "redis://redis:6379"

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "chat",
    "channels",
    "django_extensions",
]

MIDDLEWARE = [
    # "chat.middleware.DebugTokenMiddleware",  # Added middleware for debugging token
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Channel layer settings for websockets
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ.get("REDIS_URL", "redis://localhost:6379")],
        },
    },
}

# Default database setup for production and development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("CHAT_SERVICE_DB"),
        "USER": os.environ.get("CHAT_SERVICE_USER"),
        "PASSWORD": os.environ.get("CHAT_SERVICE_PASSWORD"),
        "HOST": "chat-db",
        "PORT": "5432",
        "OPTIONS": {},
    }
}

# Overwrite the database settings when running tests
if "test" in sys.argv:
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "test_" + os.environ.get("CHAT_SERVICE_DB"),
        "USER": os.environ.get("CHAT_SERVICE_USER"),
        "PASSWORD": os.environ.get("CHAT_SERVICE_PASSWORD"),
        "HOST": "chat-db",
        "PORT": "5432",
        "OPTIONS": {},
    }

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "chat.auth.CustomJWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
