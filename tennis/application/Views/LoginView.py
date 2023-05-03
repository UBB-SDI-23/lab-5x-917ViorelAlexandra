from rest_framework_simplejwt.views import TokenViewBase

from ..serializer import MyTokenObtainPairSerializer


class LoginView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer