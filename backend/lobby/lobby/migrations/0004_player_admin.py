# Generated by Django 5.1.2 on 2024-11-25 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0003_tournament_num_players'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='admin',
            field=models.BooleanField(default=False),
        ),
    ]
