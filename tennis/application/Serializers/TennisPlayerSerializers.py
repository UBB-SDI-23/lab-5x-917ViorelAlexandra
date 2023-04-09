from rest_framework import serializers
from ..Models import TennisPlayer

class TennisPlayerSerializer(serializers.ModelSerializer):

    avg_yoe_coach = serializers.FloatField(read_only=True)

    class Meta:
        model = TennisPlayer
        fields = "__all__"

    def validate(self, value):
        if value['tp_gender'] not in ['M', 'F']:
            raise serializers.ValidationError("Gender must be female or male!")
        return value


class TennisPlayerIdSerializer(serializers.ModelSerializer):

    avg_yoe_coach = serializers.FloatField(read_only=True)

    class Meta:
        model = TennisPlayer
        fields = "__all__"
        depth = 1
