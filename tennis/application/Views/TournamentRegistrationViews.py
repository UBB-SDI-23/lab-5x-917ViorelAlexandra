from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .Pagination import CustomPagination
from ..models import TournamentRegistration
from ..serializer import TournamentRegistrationSerializer, TournamentRegistrationIdSerializer

# class TournamentRegistrationDetail(APIView):
#
#     serializer_class = TournamentRegistrationSerializer
#     pagination_class = CustomPagination
#
#     def get(self, request):
#         obj = TournamentRegistration.objects.all()
#         #ids_list = list(obj.values_list('id', flat=True))
#         serializer = TournamentRegistrationSerializer(obj, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = TournamentRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class TournamentRegistrationListCreateView(generics.ListCreateAPIView):
    serializer_class = TournamentRegistrationSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = TournamentRegistration.objects.all()
        #print(queryset.explain())
        return queryset

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
