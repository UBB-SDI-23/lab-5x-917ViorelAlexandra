# from django.db import models
# from ..Models import TennisPlayer, TournamentRegistration
#
# class Tournament(models.Model):
#     t_name = models.CharField(max_length=100)
#     t_country = models.CharField(max_length=100)
#     t_start_date = models.DateField()
#     t_end_date = models.DateField()
#     t_type = models.CharField(max_length=100)
#     players = models.ManyToManyField(TennisPlayer, through='TournamentRegistration')
#
#     def __str__(self):
#         return self.t_name