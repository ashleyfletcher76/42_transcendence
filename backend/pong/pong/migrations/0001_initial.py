# Generated by Django 5.1.2 on 2024-11-14 09:19

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameState',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('room_name', models.CharField(max_length=255, unique=True)),
                ('player1', models.CharField(default='Player 1', max_length=255)),
                ('player2', models.CharField(blank=True, max_length=255, null=True)),
                ('ball_x', models.FloatField(default=0.5)),
                ('ball_y', models.FloatField(default=0.5)),
                ('ball_speed_x', models.FloatField(default=0.01)),
                ('ball_speed_y', models.FloatField(default=0.01)),
                ('left_paddle_y', models.FloatField(default=0.5)),
                ('right_paddle_y', models.FloatField(default=0.5)),
                ('left_score', models.IntegerField(default=0)),
                ('right_score', models.IntegerField(default=0)),
                ('paused', models.BooleanField(default=True)),
            ],
        ),
    ]
