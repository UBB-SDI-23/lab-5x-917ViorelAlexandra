from django.db.models import Count
from rest_framework import generics

from ..models import UserProfile
from ..serializer import UserProfileDetailSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all().annotate(
        tennis_player_count=Count("user__tennisplayer", distinct=True),
        coach_count=Count("user__coach", distinct=True),
        tournament_count=Count("user__tournament", distinct=True),
    )
    serializer_class = UserProfileDetailSerializer
    lookup_field = "id"