from django.db import models

class MatchHistory(models.Model):
	user_id = models.IntegerField(unique=True)
	trophies = models.IntegerField(default=0)
	games_total = models.IntegerField(default=0)
	wins = models.IntegerField(default=0)
	losses = models.IntegerField(default=0)

	def __str__(self):
		return f"Match History for user_id {self.user_id}"

class MatchDetail(models.Model):
	match_history = models.ForeignKey(MatchHistory, on_delete=models.CASCADE, related_name="history")
	opponent = models.CharField(max_length=50)
	result = models.CharField(max_length=50)
	score = models.CharField(max_length=50)
	date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Match against {self.opponent}: {self.result}"
