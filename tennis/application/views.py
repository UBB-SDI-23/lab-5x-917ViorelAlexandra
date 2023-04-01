from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import TennisPlayer, Coach, Tournament, TournamentRegistration
from .serializer import TennisPlayerSerializer, CoachSerializer, TournamentSerializer, TournamentRegistrationSerializer, \
    TournamentRegistrationIdSerializer, CoachIdSerializer, TournamentIdSerializer, TennisPlayerIdSerializer
from django.db.models import Avg
from django.forms import modelformset_factory
from django.shortcuts import render
from .forms import CoachForm
# Create your views here.


class TennisPlayerDetail(APIView):

    serializer_class = TennisPlayerSerializer

    def get(self, request):
        obj = TennisPlayer.objects.all()
        #ids_list = list(obj.values_list('id', flat=True))
        serializer = TennisPlayerSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TennisPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


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


class CoachDetail(APIView):

    serializer_class = CoachSerializer

    def get(self, request):
        obj = Coach.objects.all()
        #ids_list = list(obj.values_list('id', flat=True))
        serializer = CoachSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoachSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class CoachInfo(APIView):

    serializer_class = CoachIdSerializer

    def get(self, request, id):
        try:
            obj = Coach.objects.get(id=id)
        except Coach.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = CoachIdSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Coach.objects.get(id=id)
        except Coach.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = CoachSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Coach.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = CoachSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Coach.DoesNotExist:
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


class TournamentDetail(APIView):

    serializer_class = TournamentSerializer

    def get(self, request):
        obj = Tournament.objects.all()
        #ids_list = list(obj.values_list('id', flat=True))
        serializer = TournamentSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class TournamentInfo(APIView):

    serializer_class = TournamentIdSerializer

    def get(self, request, id):
        try:
            obj = Tournament.objects.get(id=id)
        except Tournament.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentIdSerializer(obj)
        serialized_data = serializer.data

        for player in serialized_data['players']:
            tournament_reg_serializer = TournamentRegistrationSerializer(TournamentRegistration.objects.get(tr_player=player['id'],
                                                                                                            tr_tournament=id))
            player['tr_registration_date'] = tournament_reg_serializer.data['tr_registration_date']
            player['tr_last_year_performance'] = tournament_reg_serializer.data['tr_last_year_performance']
            del player['tournaments']
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Tournament.objects.get(id=id)
        except Tournament.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentIdSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Tournament.objects.get(id=id)

        except Tournament.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentIdSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Tournament.objects.get(id=id)

        except Tournament.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "DELETED"}, status=status.HTTP_204_NO_CONTENT)


class TournamentRegistrationDetail(APIView):

    serializer_class = TournamentRegistrationSerializer

    def get(self, request):
        obj = TournamentRegistration.objects.all()
        #ids_list = list(obj.values_list('id', flat=True))
        serializer = TournamentRegistrationSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TournamentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class TournamentRegistrationInfo(APIView):

    serializer_class = TournamentRegistrationIdSerializer

    def get(self, request, id):
        try:
            obj = TournamentRegistration.objects.get(id=id)
        except TournamentRegistration.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentRegistrationIdSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = TournamentRegistration.objects.get(id=id)
        except TournamentRegistration.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentRegistrationSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = TournamentRegistration.objects.get(id=id)

        except TournamentRegistration.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TournamentRegistrationSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = TournamentRegistration.objects.get(id=id)

        except TournamentRegistration.DoesNotExist:
            msg = {"msg": "NOT FOUND"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "DELETED"}, status=status.HTTP_204_NO_CONTENT)


class CoachesWithAtLeastNYearsExperience(APIView):

    def get(self, request, yoe):
        years_of_exp = Coach.objects.filter(c_years_of_experience__gt=yoe)
        serializer = CoachSerializer(years_of_exp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlayersByAvgYearsOfExperienceOfCoaches(APIView):

    def get(self, request):
        avg_yoe = TennisPlayer.objects \
            .annotate(avg_yoe_coach=Avg('coaches__c_years_of_experience'))\
            .order_by('avg_yoe_coach')
        serializer = TennisPlayerSerializer(avg_yoe, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlayersRegisteredInGrandSlams(APIView):
    def get(self, request):
        tourn_regs = {}
        regs = TournamentRegistration.objects.all()
        for reg in regs:
            if reg.tr_tournament.id in tourn_regs:
                x = tourn_regs[reg.tr_tournament.id]
                x += 1
                tourn_regs.update({reg.tr_tournament.id : x})
            else:
                tourn_regs.update({reg.tr_tournament.id : 1})
        print(tourn_regs)
        sorted_reg = sorted(tourn_regs.items(), key=lambda x:x[1], reverse=True)
        print(sorted_reg)
        sorted_reg = sorted_reg[:2]
        # for r in sorted_reg:
        #     players = TopRegDTO(r[0], r[1])
        # players = TopRegDTO(sorted_reg)
        # serializer = TournamentRegistrationSerializer(players, many=True)
        return Response(sorted_reg, status=status.HTTP_200_OK)


