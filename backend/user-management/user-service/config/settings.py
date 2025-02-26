from pathlib import Path
import os
import sys

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY settings
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
DEBUG = os.environ.get("DJANGO_DEBUG") == "True"
ALLOWED_HOSTS = ["*"]

# Set to True to ensure all connections are HTTPS
SECURE_SSL_REDIRECT = False

# Prevent man in the middle attacks
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# Only allow cookies to be sent over HTTPS
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Prevent the browser from guessing the content type
SECURE_CONTENT_TYPE_NOSNIFF = True

# Enable the browser XSS protection
SECURE_BROWSER_XSS_FILTER = True

# media files for user uploads
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REDIS_URL = "redis://redis:6379"

SHARED_SECRET = os.environ.get("SHARED_SECRET")

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

	"users.apps.UsersConfig",
    "rest_framework",
    "django_extensions",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

	"users.middleware.HealthCheckLoggingMiddleware",
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

# Default database setup for production and development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("USER_SERVICE_DB"),
        "USER": os.environ.get("USER_SERVICE_USER"),
        "PASSWORD": os.environ.get("USER_SERVICE_PASSWORD"),
        "HOST": "user-db",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "disable",  # we use this to enforce ssl on the database also
        },
    }
}

# Overwrite the database settings when running tests
if "test" in sys.argv:
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "test_" + os.environ.get("USER_SERVICE_DB"),
        "USER": os.environ.get("USER_SERVICE_USER"),
        "PASSWORD": os.environ.get("USER_SERVICE_PASSWORD"),
        "HOST": "user-db",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "disable",  # we use this to enforce ssl on the database also
        },
    }


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

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

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
