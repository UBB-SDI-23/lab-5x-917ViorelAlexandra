from django.db import models

class TennisPlayer(models.Model):
    tp_first_name = models.CharField(max_length=100)
    tp_last_name = models.CharField(max_length=100)
    tp_rank = models.IntegerField()
    tp_date_of_birth = models.DateField()
    tp_country = models.CharField(max_length=100)
    tp_gender = models.CharField(max_length=10, default="X")
    tournaments = models.ManyToManyField('Tournament', through='TournamentRegistration')

    def __str__(self):
        return self.tp_last_name