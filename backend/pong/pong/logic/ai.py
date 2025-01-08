from enum import Enum
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

class AIState(Enum):
    IDLE = 1
    TRACKING = 2
    CHASING = 3

class PongAI:
    def __init__(self):
        self.state = AIState.IDLE


    def predict_ball_position(self, ball_x, ball_y, ball_speed_x, ball_speed_y, paddle_y):
        if ball_speed_x == 0:
            return ball_y

        time_to_paddle = abs(paddle_y - ball_x) / abs(ball_speed_x)
        predicted_y = ball_y + ball_speed_y * time_to_paddle

        if predicted_y < -1 or predicted_y > 1:
            predicted_y = 1 - (predicted_y + 1) % 2

        return predicted_y

    def update_state(self, ball_x, ball_y, ball_speed_x, paddle_y, threshold_distance=0.1):
        distance_to_ball = abs(paddle_y - ball_x)
        
        if distance_to_ball > threshold_distance:
            self.state = AIState.IDLE
        elif distance_to_ball <= threshold_distance and ball_speed_x > 0:
            self.state = AIState.TRACKING
        elif distance_to_ball <= threshold_distance / 2:
            self.state = AIState.CHASING

    def decide_move(self, ball_x, ball_y, ball_speed_x, ball_speed_y, paddle_y):
        self.update_state(ball_x, ball_y, ball_speed_x, paddle_y)
        print(f"self state = {self.state}")

        if self.state == AIState.IDLE:
            return "stay"

        predicted_y = self.predict_ball_position(ball_x, ball_y, ball_speed_x, ball_speed_y, paddle_y)
        print(f"predicted y = {predicted_y}")

        if predicted_y < paddle_y - PADDLE_HEIGHT / 2:
            return "up"
        elif predicted_y > paddle_y + PADDLE_HEIGHT / 2:
            return "down"
        
        return "stay"