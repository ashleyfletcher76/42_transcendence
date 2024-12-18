from django.db import models
import uuid

# Create your models here.
class GameState(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room_name = models.CharField(max_length=255, unique=True)
    player1 = models.CharField(max_length=255, default="Player 1")
    player2 = models.CharField(max_length=255, null=True, blank=True)
    ball_x = models.FloatField(default = 0.5)
    ball_y = models.FloatField(default = 0.5)
    ball_speed_x = models.FloatField(default = 0.002)
    ball_speed_y = models.FloatField(default = 0.002)
    left_paddle_y = models.FloatField(default=0.5)
    right_paddle_y = models.FloatField(default=0.5)
    left_score = models.IntegerField(default=0)
    right_score = models.IntegerField(default=0)
    winner = models.CharField(max_length=255, null=True, blank=True)
    finished = models.BooleanField(default=False)
    paused = models.BooleanField(default=True)
    game_type = models.CharField(max_length=255, default="None")
    creation_time = models.FloatField(default=0)
    player1_timer = models.FloatField(default=0)
    player2_timer = models.FloatField(default=0)
    game_start_timer = models.IntegerField(default=3)


    def __str__(self):
        return f"Ball ({self.ball_x}, {self.ball_y}), Left Paddle {self.left_paddle_y}, Right Paddle {self.right_paddle_y}"