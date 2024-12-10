# Generated by Django 5.1.2 on 2024-12-07 14:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opponent', models.CharField(default='No opponent', max_length=255)),
                ('room', models.CharField(default='No opponent', max_length=255)),
                ('score', models.IntegerField(default=0)),
                ('admin', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('num_players', models.IntegerField(default=0)),
                ('max_players', models.IntegerField(default=16)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('ongoing', models.BooleanField(default=True)),
                ('players', models.ManyToManyField(blank=True, related_name='tournaments', to='lobby.player')),
            ],
        ),
    ]
