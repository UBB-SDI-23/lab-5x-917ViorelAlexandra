from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..Models import TennisPlayer, TournamentRegistration, Coach, Tournament
from ..Serializers.TennisPlayerSerializers import TennisPlayerSerializer, TennisPlayerIdSerializer
from ..Serializers.TournamentSerializers import TournamentSerializer, TournamentIdSerializer
from ..Serializers.CoachSerializers import CoachSerializer, CoachIdSerializer
from ..Serializers.TournamentRegistrationSerializers import TournamentRegistrationSerializer, TournamentRegistrationIdSerializer


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