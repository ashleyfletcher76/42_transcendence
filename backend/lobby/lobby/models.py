from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    gameRoom = models.IntegerField(default=0)
    admin = models.BooleanField(default=False)

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    num_players = models.IntegerField(default=0)
    max_players = models.IntegerField(default=16)
    players = models.ManyToManyField(Player, related_name="tournaments")
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    ongoing = models.BooleanField(default=True)
