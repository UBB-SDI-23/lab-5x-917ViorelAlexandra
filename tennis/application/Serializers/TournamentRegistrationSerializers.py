# from rest_framework import serializers
# from ..models import TennisPlayer, Tournament, TournamentRegistration
#
# class TournamentRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TournamentRegistration
#         fields = "__all__"
#
#     def validate_tournament_id(self, value):
#         filter = Tournament.objects.filter(id=value)
#         if not filter.exists():
#             raise serializers.ValidationError("Tournament does not exist!")
#         return value
#
#     def validate_player_id(self, value):
#         filter = TennisPlayer.objects.filter(id=value)
#         if not filter.exists():
#             raise serializers.ValidationError("Tennis player does not exist!")
#         return value
#
#     def validate(self, data):
#         print(data['tr_player'].tp_gender)
#         if data['tr_player'].tp_gender == "F":
#             if 'ATP' in data['tr_tournament'].t_type:
#                 raise serializers.ValidationError("Woman cannot register into man tournament!")
#         elif data['tr_player'].tp_gender == "M":
#             if 'WTA' in data['tr_tournament'].t_type:
#                 raise serializers.ValidationError("Man cannot register into woman tournament!")
#         return data
#
# class TournamentRegistrationIdSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TournamentRegistration
#         depth = 1
#         fields = "__all__"
#
#     def validate_tournament_id(self, value):
#         filter = Tournament.objects.filter(id=value)
#         if not filter.exists():
#             raise serializers.ValidationError("Tournament does not exist!")
#         return value
#
#     def validate_player_id(self, value):
#         filter = TennisPlayer.objects.filter(id=value)
#         if not filter.exists():
#             raise serializers.ValidationError("Tennis player does not exist!")
#         return value
#
#     def validate(self, data):
#         if data['tr_player'].tp_gender == "F":
#             if 'ATP' in data['tr_tournament'].t_type:
#                 raise serializers.ValidationError("Woman cannot register into man tournament!")
#         elif data['tr_player'].tp_gender == "M":
#             if 'WTA' in data['tr_tournament'].t_type:
#                 raise serializers.ValidationError("Man cannot register into woman tournament!")
#         return data
