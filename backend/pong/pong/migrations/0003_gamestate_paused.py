# Generated by Django 5.1.2 on 2024-11-12 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pong', '0002_alter_gamestate_player1_alter_gamestate_player2'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamestate',
            name='paused',
            field=models.BooleanField(default=True),
        ),
    ]
