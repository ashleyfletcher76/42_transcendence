# services/game_logic.py
class PongGame:
    SCREEN_WIDTH = 800
    SCREEN_HEIGHT = 400
    BALL_RADIUS = 10
    PADDLE_WIDTH = 10
    PADDLE_HEIGHT = 100
    END_SCORE = 10

    def __init__(self, game_state):
        self.game = game_state

    def update(self, keypress_p1=None, keypress_p2=None, player=None):
        if not self.game.paused:
            self.apply_keypress(keypress_p1, keypress_p2, player)
            self.move_ball()
            self.check_win_condition()

    def apply_keypress(self, keypress_p1, keypress_p2, player):
        if player == self.game.player1 or not player:
            if keypress_p1 == 'up':
                self.move_left_paddle(-1)
            elif keypress_p1 == 'down':
                self.move_left_paddle(1)
        if player == self.game.player2 or not player:
            if keypress_p2 == 'up':
                self.move_right_paddle(-1)
            elif keypress_p2 == 'down':
                self.move_right_paddle(1)

    def move_ball(self):
        self.game.ball_x += self.game.ball_speed_x
        self.game.ball_y += self.game.ball_speed_y

        if self.game.ball_y <= -1 or self.game.ball_y >= 1:
            self.game.ball_speed_y = -self.game.ball_speed_y

        if self.game.ball_x <= -0.95:
            if self.is_paddle_hit(self.game.left_paddle_y, self.game.ball_y):
                self.handle_paddle_hit("left")
            else:
                self.game.right_score += 1
                self.reset_ball()
        elif self.game.ball_x >= 0.95:
            if self.is_paddle_hit(self.game.right_paddle_y, self.game.ball_y):
                self.handle_paddle_hit("right")
            else:
                self.game.left_score += 1
                self.reset_ball()

    def move_left_paddle(self, direction):
        self.game.left_paddle_y += direction * 0.015
        self.game.left_paddle_y = max(-1, min(1, self.game.left_paddle_y))

    def move_right_paddle(self, direction):
        self.game.right_paddle_y += direction * 0.015
        self.game.right_paddle_y = max(-1, min(1, self.game.right_paddle_y))

    def handle_paddle_hit(self, side):
        self.game.ball_speed_x = -self.game.ball_speed_x

    def reset_ball(self):
        self.game.ball_x, self.game.ball_y = 0, 0
        self.game.ball_speed_x *= -1

    def is_paddle_hit(self, paddle_y, ball_y, paddle_height=0.2):
        paddle_top = paddle_y - paddle_height / 2
        paddle_bottom = paddle_y + paddle_height / 2
        return paddle_top <= ball_y <= paddle_bottom

    def check_win_condition(self):
        if self.game.right_score >= self.END_SCORE or self.game.left_score >= self.END_SCORE:
            self.game.paused = True
