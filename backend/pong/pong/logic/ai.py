BALL_RADIUS = 0.02
PADDLE_WIDTH = 0.016*2
PADDLE_HEIGHT = 0.2
PADDLE_DISTANCE = 0.016*2
SCREEN_DISTANCE = PADDLE_WIDTH + PADDLE_DISTANCE + BALL_RADIUS
END_SCORE = 5
SPEED_PADDLE = 0.05
MAX_BALL_SPEED = 0.2
ANGLE_FACTOR = 0.015
SPEED_INCREMENT = 0.001

class PongAI:
    def __init__(self):
        self.ai_mode = 0

    def predict_ball_position(self, ball_x, ball_y, ball_speed_x, ball_speed_y):
        if ball_speed_x == 0:
            return ball_y

        time_to_paddle = abs((1.0 - ball_x) / ball_speed_x)

        predicted_y = ball_y + ball_speed_y * time_to_paddle

        while predicted_y < -1.0 or predicted_y > 1.0:
            if predicted_y < -1.0:
                predicted_y = -2.0 - predicted_y
            elif predicted_y > 1.0:
                predicted_y = 2.0 - predicted_y

        return predicted_y


    def decide_move(self, ball_x, ball_y, ball_speed_x, ball_speed_y, left_score):
        if left_score >= 3:
            self.ai_mode = 1
        if ball_speed_x < 0:
            return 0, self.ai_mode
        predicted_y = self.predict_ball_position(ball_x, ball_y, ball_speed_x, ball_speed_y)
        if self.ai_mode == 1:
            if ball_speed_y > 0:
                predicted_y = min(predicted_y + PADDLE_HEIGHT / 2, 1.0)
            else:
                predicted_y = max(predicted_y - PADDLE_HEIGHT / 2, -1.0)
        return predicted_y, self.ai_mode
