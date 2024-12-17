from django.apps import AppConfig
import threading
from .game_loop import start_game_loop

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pong'

    def ready(self):
        if threading.current_thread().name == 'MainThread':
            start_game_loop()
