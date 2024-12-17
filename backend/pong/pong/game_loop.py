# game_logic.py

import threading
from time import sleep
from pong.logic.game_logic import game_logic
from django.apps import apps

UPDATE_INTERVAL = 0.016

game_threads = {}

def start_game_loop():
    def loop():
        GameState = apps.get_model('pong', 'GameState')

        while True:
            active_games = GameState.objects.filter(paused=False, finished=False)

            active_game_ids = set(game.id for game in active_games)

            for game in active_games:
                if game.id not in game_threads or not game_threads[game.id].is_alive():
                    thread = threading.Thread(target=run_game, args=(game.id,), daemon=True)
                    game_threads[game.id] = thread
                    thread.start()

            for game_id in list(game_threads.keys()):
                if game_id not in active_game_ids:
                    del game_threads[game_id]

            sleep(UPDATE_INTERVAL)

    thread = threading.Thread(target=loop, daemon=True)
    thread.start()

def run_game(game_id):
    GameState = apps.get_model('pong', 'GameState')

    while True:
        try:
            game = GameState.objects.get(id=game_id)
            if game.paused or game.finished:
                break

            game_logic(game)
            game.save()
            sleep(UPDATE_INTERVAL)

        except GameState.DoesNotExist:
            break
