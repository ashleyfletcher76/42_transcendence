from django.apps import AppConfig
import os

class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
        import users.signals
