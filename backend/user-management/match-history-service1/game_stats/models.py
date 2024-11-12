from django.db import models


class GameStat(models.Model):
    user_id = models.IntegerField()
