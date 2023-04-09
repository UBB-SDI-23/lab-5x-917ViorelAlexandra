from rest_framework import serializers
from ..Models import Tournament

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"

class TournamentIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"
        depth = 1
