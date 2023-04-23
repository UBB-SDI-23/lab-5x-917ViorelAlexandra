from rest_framework import serializers
from .models import TennisPlayer, Coach, Tournament, TournamentRegistration


class TennisPlayerSerializer(serializers.ModelSerializer):

    avg_yoe_coach = serializers.FloatField(read_only=True)
    nb_coaches = serializers.IntegerField(read_only=True)

    class Meta:
        model = TennisPlayer
        fields = "__all__"

    def validate_gender(self, value):
        if value['tp_gender'] not in ['M', 'F']:
            raise serializers.ValidationError("Gender must be F or M!")
        return value

    def validate_rank(self, value):
        if value['tp_rank'] < 1:
            raise serializers.ValidationError("Rank must be greater than 0!")
        return value


class TennisPlayerIdSerializer(serializers.ModelSerializer):

    avg_yoe_coach = serializers.FloatField(read_only=True)

    def validate_gender(self, value):
        if value['tp_gender'] not in ['M', 'F']:
            raise serializers.ValidationError("Gender must be F or M!")
        return value

    def validate_rank(self, value):
        if value['tp_rank'] < 1:
            raise serializers.ValidationError("Rank must be greater than 0!")
        return value

    class Meta:
        model = TennisPlayer
        fields = "__all__"
        depth = 1


class CoachSerializer(serializers.ModelSerializer):

    c_first_name = serializers.CharField(max_length=100)
    c_last_name = serializers.CharField(max_length=100)
    c_date_of_birth = serializers.DateField()
    c_years_of_experience = serializers.IntegerField()
    c_email = serializers.CharField(max_length=100)
    player = TennisPlayer()

    class Meta:
        model = Coach
        fields = "__all__"

    def validate_player_id(self, value):
        filter = TennisPlayer.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tennis player does not exist!")
        return value

    def validate_years_of_experience(self, value):
        if value['c_years_of_experience'] < 0:
            raise serializers.ValidationError("Years of experience must be at least 0!")


class CoachIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        depth = 1
        fields = "__all__"

    def validate_player_id(self, value):
        filter = TennisPlayer.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tennis player does not exist!")
        return value

    def validate_years_of_experience(self, value):
        if value['c_years_of_experience'] < 0:
            raise serializers.ValidationError("Years of experience must be at least 0!")


class TournamentSerializer(serializers.ModelSerializer):

    nb_registers = serializers.IntegerField(read_only=True)
    class Meta:
        model = Tournament
        fields = "__all__"

class TournamentIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"
        depth = 1


class TournamentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentRegistration
        fields = "__all__"

    def validate_tournament_id(self, value):
        filter = Tournament.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tournament does not exist!")
        return value

    def validate_player_id(self, value):
        filter = TennisPlayer.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tennis player does not exist!")
        return value

    def validate(self, data):
        print(data['tr_player'].tp_gender)
        if data['tr_player'].tp_gender == "F":
            if 'ATP' in data['tr_tournament'].t_type:
                raise serializers.ValidationError("Woman cannot register into man tournament!")
        elif data['tr_player'].tp_gender == "M":
            if 'WTA' in data['tr_tournament'].t_type:
                raise serializers.ValidationError("Man cannot register into woman tournament!")
        return data

class TournamentRegistrationIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentRegistration
        depth = 1
        fields = "__all__"

    def validate_tournament_id(self, value):
        filter = Tournament.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tournament does not exist!")
        return value

    def validate_player_id(self, value):
        filter = TennisPlayer.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Tennis player does not exist!")
        return value

    def validate(self, data):
        if data['tr_player'].tp_gender == "F":
            if 'ATP' in data['tr_tournament'].t_type:
                raise serializers.ValidationError("Woman cannot register into man tournament!")
        elif data['tr_player'].tp_gender == "M":
            if 'WTA' in data['tr_tournament'].t_type:
                raise serializers.ValidationError("Man cannot register into woman tournament!")
        return data


class TopRegDTO(serializers.ModelSerializer):
    def __init__(self, t, n):
        tr_tournament = t
        nb = n
