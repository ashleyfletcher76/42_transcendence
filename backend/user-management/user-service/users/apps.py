from django.apps import AppConfig
import os, threading
from .redis_listener import redis_listener

class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
        import users.signals

        # start Redis listener in a separate thread
        thread = threading.Thread(target=redis_listener, daemon=True)
        thread.start()
