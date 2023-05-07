from collections import OrderedDict
from typing import Any

from rest_framework import serializers
from .models import TennisPlayer, Coach, Tournament, TournamentRegistration, UserProfile
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import RefreshToken, TokenObtainPairSerializer

class DynamicSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        depth = kwargs.pop('depth', None)
        super().__init__(*args, **kwargs)
        self.Meta.depth = 1 if depth is None else depth

class TennisPlayerSerializer(DynamicSerializer):
    avg_yoe_coach = serializers.FloatField(read_only=True)
    nb_coaches = serializers.IntegerField(read_only=True)
    added_by = User()

    class Meta:
        model = TennisPlayer
        fields = "__all__"
        depth = 1

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


class CoachSerializer(DynamicSerializer):

    c_first_name = serializers.CharField(max_length=100)
    c_last_name = serializers.CharField(max_length=100)
    c_date_of_birth = serializers.DateField()
    c_years_of_experience = serializers.IntegerField()
    c_email = serializers.CharField(max_length=100)
    player = TennisPlayer()
    added_by = User()

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


class TournamentSerializer(DynamicSerializer):

    nb_registers = serializers.IntegerField(read_only=True)
    added_by = User()

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
        )

    def validate_password(self, value):
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError('Password must contain at least one digit.')

        if not any(char.isupper() for char in value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')

        return value


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "u_first_name",
            "u_last_name",
            "u_date_of_birth",
            "u_bio",
            "u_location",
            "activation_code",
            "activation_expiry_date",
            "active",
        )

    def create(self, validated_data: OrderedDict[str, Any]) -> UserProfile:
        user_data = validated_data.pop("user")
        user_data['is_active'] = False
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile

class UserProfileDetailSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    tennis_player_count = serializers.IntegerField()
    coach_count = serializers.IntegerField()
    tournament_count = serializers.IntegerField()

    def get_username(self, user_profile: UserProfile) -> str:
        return user_profile.user_id  # type: ignore

    class Meta:
        model = UserProfile
        fields = (
            "username",
            "u_first_name",
            "u_last_name",
            "u_date_of_birth",
            "u_bio",
            "u_location",
            "tennis_player_count",
            "coach_count",
            "tournament_count",
        )

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        user = UserProfile.objects.get(user_id = self.user.username)

        refresh["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "u_first_name": user.u_first_name,
            "u_last_name": user.u_last_name,
            "u_bio": user.u_bio,
            "u_date_of_birth": f'{user.u_date_of_birth}',
            "u_location": user.u_location,
        }

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data