from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class TennisPlayer(models.Model):
    tp_first_name = models.CharField(max_length=100)
    tp_last_name = models.CharField(max_length=100)
    tp_rank = models.IntegerField()
    tp_date_of_birth = models.DateField()
    tp_country = models.CharField(max_length=100)
    tp_gender = models.CharField(max_length=10, default="X")
    tournaments = models.ManyToManyField('Tournament', through='TournamentRegistration')
    # added_by = models.ForeignKey('User', on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.tp_last_name

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["tp_last_name"])]


class Coach(models.Model):
    c_first_name = models.CharField(max_length=100)
    c_last_name = models.CharField(max_length=100)
    c_date_of_birth = models.DateField()
    c_years_of_experience = models.IntegerField()
    c_email = models.CharField(max_length=100)
    player = models.ForeignKey(TennisPlayer, on_delete=models.CASCADE, related_name="coaches")
    c_description = models.CharField(max_length=5000, default="")
    # added_by = models.ForeignKey('User', on_delete=models.CASCADE, default=None)


    def __str__(self):
        return self.c_last_name

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["player", "id"]), models.Index(fields=["c_years_of_experience", "id"]),
                   models.Index(fields=["c_last_name"])]


class Tournament(models.Model):
    t_name = models.CharField(max_length=100)
    t_country = models.CharField(max_length=100)
    t_start_date = models.DateField()
    t_end_date = models.DateField()
    t_type = models.CharField(max_length=100)
    players = models.ManyToManyField(TennisPlayer, through='TournamentRegistration')
    # added_by = models.ForeignKey('User', on_delete=models.CASCADE, default=None)


    def __str__(self):
        return self.t_name

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["t_type", "id"]), models.Index(fields=["t_name"])]


class TournamentRegistration(models.Model):
    tr_registration_date = models.DateField()
    tr_last_year_performance = models.CharField(max_length=100)
    tr_player = models.ForeignKey(TennisPlayer, on_delete=models.CASCADE, null=False)
    tr_tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["tr_player", "tr_tournament"]),
                   models.Index(fields=["tr_player"]),
                   models.Index(fields=["tr_tournament"]),
                   models.Index(fields=["tr_registration_date"]),
                   models.Index(fields=["tr_last_year_performance"])]


class UserProfile(models.Model):
    u_first_name = models.CharField(max_length=100)
    u_last_name = models.CharField(max_length=100)
    u_date_of_birth = models.DateField()
    u_bio = models.CharField(max_length=500)
    u_location = models.CharField(max_length=100)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile", to_field="username"
    )
    activation_code = models.CharField(max_length=36)
    activation_expiry_date = models.DateTimeField()
    active = models.BooleanField()