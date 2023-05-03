import uuid
from datetime import timedelta
from typing import Any

from django.utils import timezone
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response

from ..models import UserProfile
from ..serializer import UserProfileSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
    View to register a new user.
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        activation_expiry_date = str(timezone.now() + timedelta(minutes=10))
        activation_code = str(uuid.uuid4())
        data = request.data.copy()
        data["activation_code"] = activation_code
        data["activation_expiry_date"] = activation_expiry_date
        data["active"] = False

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"activation_code": activation_code},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class UserActivationView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        activation_code = request.data.get("activation_code")
        try:
            user_profile: UserProfile = UserProfile.objects.get(
                activation_code=activation_code
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "Activation code not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user_profile.activation_expiry_date < timezone.now():
            return Response(
                {"error": "Activation code expired"}, status=status.HTTP_400_BAD_REQUEST
            )

        if user_profile.active:
            return Response(
                {"success": "Account already active"}, status=status.HTTP_200_OK
            )

        user_profile.active = True
        user_profile.save()
        return Response(
            {"success": "User profile activated"}, status=status.HTTP_200_OK
        )