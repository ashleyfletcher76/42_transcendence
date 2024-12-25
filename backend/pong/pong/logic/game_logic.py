
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100
END_SCORE = 5
SPEED_PADDLE = 0.05


def game_logic(game):

    game["ball_x"] += game['ball_speed_x']
    game["ball_y"] += game["ball_speed_y"]

    if game["ball_y"] <= -1 or game["ball_y"] >= 1:
        game["ball_speed_y"] = -game["ball_speed_y"]

    if game["ball_x"] <= -0.95:
        if is_paddle_hit(game["left_paddle_y"], game["ball_y"]):
            handle_paddle_hit(game, "left")
        else:
            game["right_score"] += 1
            reset_ball(game)

    elif game["ball_x"] >= 0.95:
        if is_paddle_hit(game["right_paddle_y"], game["ball_y"]):
            handle_paddle_hit(game, "right")
        else:
            game["left_score"] += 1
            reset_ball(game)

    if game["player2"] == "AI":
        update_ai(game)

    if game["right_score"] >= END_SCORE or game["left_score"] >= END_SCORE:
        if game["right_score"] >= END_SCORE:
            game["winner"] = game["player1"]
        else:
            game["winner"] = game["player2"]
        game["paused"] = True
        game["finished"] = True


def update_ai(game):
    if game["ball_y"] < game["right_paddle_y"]:
        move_right_paddle(game, -1)
    elif game["ball_y"] > game["right_paddle_y"]:
        move_right_paddle(game, 1)

def move_right_paddle(game, direction):
    game["right_paddle_y"] += direction * SPEED_PADDLE
    game["right_paddle_y"] = max(-1, min(1, game["right_paddle_y"]))

def move_left_paddle(game, direction):
    game["left_paddle_y"] += direction * SPEED_PADDLE
    game["left_paddle_y"] = max(-1, min(1, game["left_paddle_y"]))

def handle_paddle_hit(game, side):
    game['ball_speed_x'] = -game['ball_speed_x']

def reset_ball(game):
    game["ball_x"], game["ball_y"] = 0, 0
    game['ball_speed_x'] *= -1

def is_paddle_hit(paddle_y, ball_y, paddle_height=0.2):
    paddle_top = paddle_y - paddle_height / 2
    paddle_bottom = paddle_y + paddle_height / 2
    return paddle_top <= ball_y <= paddle_bottom






def handle_local_input(game, keypress_p1, keypress_p2=None):

    if keypress_p1 == 'up':
        move_left_paddle(game, -1)
    elif keypress_p1 == 'down':
        move_left_paddle(game, 1)

    if game["player2"] == "local":
        if keypress_p2 == 'up':
            move_right_paddle(game, -1)
        elif keypress_p2 == 'down':
            move_right_paddle(game, 1)


def handle_remote_input(game, keypress, player):

    if player == game["player1"]:
        if keypress == 'up':
            move_left_paddle(game, -1)
        elif keypress == 'down':
            move_left_paddle(game, 1)

    elif player == game["player2"]:
        if keypress == 'up':
            move_right_paddle(game, -1)
        elif keypress == 'down':
            move_right_paddle(game, 1)
