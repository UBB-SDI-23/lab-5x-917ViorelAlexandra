from typing import Any

from django.db.models import Avg, Count, QuerySet
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.views import APIView

from .Pagination import CustomPagination
from ..models import TennisPlayer, TournamentRegistration
from ..serializer import TennisPlayerSerializer, TennisPlayerIdSerializer, CoachSerializer, \
    TournamentRegistrationSerializer


class TennisPlayerListCreateView(generics.ListCreateAPIView):
    serializer_class = TennisPlayerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = TennisPlayer.objects.all().annotate(nb_coaches=Count('coaches'))
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = TennisPlayerSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )



class TennisPlayerInfo(APIView):

    serializer_class = TennisPlayerIdSerializer

    def get(self, request, id):
        try:
            obj = TennisPlayer.objects.get(id=id)
            serializer_player = TennisPlayerIdSerializer(obj)
            serializer_coaches = CoachSerializer(obj.coaches.all(), many=True)

            serialized_player_data = serializer_player.data
            serialized_player_data['coaches'] = serializer_coaches.data

            for i in range(len(serialized_player_data['coaches'])):
                del serialized_player_data['coaches'][i]['player']

            serialized_data = serializer_player.data

            for tournament in serialized_data['tournaments']:
                tournament_reg_serializer = TournamentRegistrationSerializer(
                    TournamentRegistration.objects.get(tr_player=id,
                                                       tr_tournament=tournament['id']))
                tournament['tr_registration_date'] = tournament_reg_serializer.data['tr_registration_date']
                tournament['tr_last_year_performance'] = tournament_reg_serializer.data['tr_last_year_performance']
                del tournament['players']

        except TennisPlayer.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        return Response(serialized_player_data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = TennisPlayer.objects.get(id=id)
        except TennisPlayer.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TennisPlayerSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = TennisPlayer.objects.get(id=id)

        except TennisPlayer.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TennisPlayerSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = TennisPlayer.objects.get(id=id)

        except TennisPlayer.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "DELETED"}, status=status.HTTP_204_NO_CONTENT)

class TennisPlayerCoachListInfo(APIView):
    def post(self, request, id):

        coaches = request.data
        msg = "CREATED"

        for coach_data in coaches:
            coach_data['player'] = id
            print(coach_data)
            serializer = CoachSerializer(data=coach_data)
            if serializer.is_valid():
                serializer.save()
        return Response(msg, status=status.HTTP_201_CREATED)


class PlayersByAvgYearsOfExperienceOfCoaches(generics.ListCreateAPIView):

    serializer_class = TennisPlayerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = TennisPlayer.objects \
            .annotate(avg_yoe_coach=Avg('coaches__c_years_of_experience'))\
            .order_by('avg_yoe_coach')
        return queryset


class PlayersRegisteredInGrandSlams(generics.ListCreateAPIView):

    serializer_class = TennisPlayerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = TennisPlayer.objects.filter(tournaments__t_type='Grand Slam').distinct()
        return queryset




        # tourn_regs = {}
        # regs = TournamentRegistration.objects.all()
        # for reg in regs:
        #     if reg.tr_tournament.id in tourn_regs:
        #         x = tourn_regs[reg.tr_tournament.id]
        #         x += 1
        #         tourn_regs.update({reg.tr_tournament.id : x})
        #     else:
        #         tourn_regs.update({reg.tr_tournament.id : 1})
        # print(tourn_regs)
        # sorted_reg = sorted(tourn_regs.items(), key=lambda x:x[1], reverse=True)
        # print(sorted_reg)
        # sorted_reg = sorted_reg[:2]
        # # for r in sorted_reg:
        # #     players = TopRegDTO(r[0], r[1])
        # # players = TopRegDTO(sorted_reg)
        # # serializer = TournamentRegistrationSerializer(players, many=True)
        # return Response(sorted_reg, status=status.HTTP_200_OK)

class TennisPlayerOrderedByName(generics.ListCreateAPIView):
    serializer_class = TennisPlayerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        p_last_name = self.kwargs.get("p_last_name")
        queryset = TennisPlayer.objects.all()
        if p_last_name is not None:
            queryset = queryset.filter(tp_last_name__icontains=p_last_name)
        print(queryset.explain())
        print(p_last_name)
        return queryset