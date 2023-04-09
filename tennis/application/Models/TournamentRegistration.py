# from django.db import models
# from ..Models import TennisPlayer, Tournament
#
# class TournamentRegistration(models.Model):
#     tr_registration_date = models.DateField()
#     tr_last_year_performance = models.CharField(max_length=100)
#     tr_player = models.ForeignKey(TennisPlayer, on_delete=models.CASCADE, null=False)
#     tr_tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, null=False)