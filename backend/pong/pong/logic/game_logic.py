BALL_RADIUS = 0.02  # 2% of game width
PADDLE_WIDTH = 0.016*2  # 1.6% of game width
PADDLE_HEIGHT = 0.2  # 20% of game height
PADDLE_DISTANCE = 0.016*2  # Same as paddle width
SCREEN_DISTANCE = PADDLE_WIDTH + PADDLE_DISTANCE + BALL_RADIUS
END_SCORE = 5
SPEED_PADDLE = 0.05
MAX_BALL_SPEED = 0.2
ANGLE_FACTOR = 0.015
SPEED_INCREMENT = 0.001


def game_logic(game):

    game["ball_x"] += game["ball_speed_x"]
    game["ball_y"] += game["ball_speed_y"]


    if game["ball_y"] <= -1 or game["ball_y"] >= 1:
        game["ball_speed_y"] *= -1

    if game["ball_x"] <= -1 + SCREEN_DISTANCE:
        if is_paddle_hit(game["left_paddle_y"], game["ball_y"]):
            handle_paddle_hit(game, "left")
            game["ball_x"] = -1 + SCREEN_DISTANCE
    elif game["ball_x"] >= 1 - SCREEN_DISTANCE:
        if is_paddle_hit(game["right_paddle_y"], game["ball_y"]):
            handle_paddle_hit(game, "right")
            game["ball_x"] = 1 - SCREEN_DISTANCE

    if game["ball_x"] <= -1:
        game["right_score"] += 1
        reset_ball(game)

    if game["ball_x"] >= 1:
        game["left_score"] += 1
        reset_ball(game)

    if game["right_score"] == END_SCORE or game["left_score"] == END_SCORE:
        end_game(game)


def end_game(game):
    game["winner"] = game["player1"] if game["left_score"] == END_SCORE else game["player2"]
    game["paused"] = True
    game["finished"] = True


def update_ai(game):
    if game["ball_y"] < game["right_paddle_y"]:
        move_right_paddle(game, -1)
    elif game["ball_y"] > game["right_paddle_y"]:
        move_right_paddle(game, 1)


def move_right_paddle(game, direction):
    new_position = game["right_paddle_y"] + direction * SPEED_PADDLE
    game["right_paddle_y"] = max(-1 + PADDLE_HEIGHT, min(1 - PADDLE_HEIGHT, new_position))


def move_left_paddle(game, direction):
    new_position = game["left_paddle_y"] + direction * SPEED_PADDLE
    game["left_paddle_y"] = max(-1 + PADDLE_HEIGHT, min(1 - PADDLE_HEIGHT, new_position))


def handle_paddle_hit(game, side):
    game["ball_speed_x"] *= -1  # Reverse ball's horizontal direction

    paddle_center = game[f"{side}_paddle_y"]
    ball_center = game["ball_y"]
    distance_from_center = (ball_center - paddle_center) / (PADDLE_HEIGHT / 2)

    impact_factor = distance_from_center * abs(distance_from_center)

    is_paddle_moving = (
        (side == "left" and game.get("p1_paddle") in ["up", "down"]) or
        (side == "right" and game.get("p2_paddle") in ["up", "down"])
    )

    game["ball_speed_y"] += impact_factor * ANGLE_FACTOR

    if is_paddle_moving:
        movement_speed_boost = SPEED_INCREMENT * 2
        game["ball_speed_x"] += movement_speed_boost if game["ball_speed_x"] > 0 else -movement_speed_boost
        game["ball_speed_y"] += movement_speed_boost if game["ball_speed_y"] > 0 else -movement_speed_boost
    else:
        # Regular speed increment
        game["ball_speed_x"] += SPEED_INCREMENT if game["ball_speed_x"] > 0 else -SPEED_INCREMENT
        game["ball_speed_y"] += SPEED_INCREMENT if game["ball_speed_y"] > 0 else -SPEED_INCREMENT

    game["ball_speed_x"] = max(min(game["ball_speed_x"], MAX_BALL_SPEED), -MAX_BALL_SPEED)
    game["ball_speed_y"] = max(min(game["ball_speed_y"], MAX_BALL_SPEED), -MAX_BALL_SPEED)


def reset_ball(game):
    game["ball_x"], game["ball_y"] = 0, 0
    game["ball_speed_x"] = 0.02 if game["ball_speed_x"] > 0 else -0.02
    game["ball_speed_y"] = 0


def is_paddle_hit(paddle_y, ball_y):
    paddle_top = paddle_y + PADDLE_HEIGHT
    paddle_bottom = paddle_y - PADDLE_HEIGHT
    return paddle_bottom <= ball_y <= paddle_top


