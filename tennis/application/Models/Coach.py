from django.db import models
from ..Models import TennisPlayer

class Coach(models.Model):
    c_first_name = models.CharField(max_length=100)
    c_last_name = models.CharField(max_length=100)
    c_date_of_birth = models.DateField()
    c_years_of_experience = models.IntegerField()
    c_email = models.CharField(max_length=100)
    player = models.ForeignKey(TennisPlayer, on_delete=models.CASCADE, related_name="coaches")

    def __str__(self):
        return self.c_last_name
