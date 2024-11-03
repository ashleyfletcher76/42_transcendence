from django.db import models

# Create your models here.
class GameState(models.Model):
    ball_x = models.FloatField(default = 0.5)
    ball_y = models.FloatField(default = 0.5)
    ball_speed_x = models.FloatField(default = 0.01)
    ball_speed_y = models.FloatField(default = 0.01)
    left_paddle_y = models.FloatField(default=0.5)  # Left paddle position (0.0 to 1.0)
    right_paddle_y = models.FloatField(default=0.5)  # Right paddle position (0.0 to 1.0)
    left_score = models.IntegerField(default=0)  # Left player's score
    right_score = models.IntegerField(default=0)  # Right player's score

    def __str__(self):
        return f"Ball ({self.ball_x}, {self.ball_y}), Left Paddle {self.left_paddle_y}, Right Paddle {self.right_paddle_y}"