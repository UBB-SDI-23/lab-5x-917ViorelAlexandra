from rest_framework import serializers
from ..Models import TennisPlayer, Coach


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
