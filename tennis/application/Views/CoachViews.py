from typing import Any

from django.db.models import QuerySet
from rest_framework import status, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer
from rest_framework.views import APIView

from .Pagination import CustomPagination
from ..models import Coach
from ..serializer import CoachSerializer, CoachIdSerializer


class CoachListCreateView(generics.ListCreateAPIView):
    serializer_class = CoachSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Coach.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = CoachSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


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


class CoachesWithAtLeastNYearsExperience(generics.ListCreateAPIView):

    serializer_class = CoachSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        min_yoe = self.kwargs.get("yoe")
        queryset = Coach.objects.all()
        if min_yoe is not None:
            queryset = queryset.filter(c_years_of_experience__gte=min_yoe)
        return queryset