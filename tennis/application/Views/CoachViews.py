from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .Pagination import CustomPagination
from ..models import Coach
from ..serializer import CoachSerializer, CoachIdSerializer

class CoachDetail(APIView):

    serializer_class = CoachSerializer
    pagination_class = CustomPagination

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
    pagination_class = CustomPagination

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

class CoachesWithAtLeastNYearsExperience(APIView):

    def get(self, request, yoe):
        years_of_exp = Coach.objects.filter(c_years_of_experience__gt=yoe)
        serializer = CoachSerializer(years_of_exp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)