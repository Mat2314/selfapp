from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from selfapp.decorators import log_exceptions
from django.http import JsonResponse
from django.core.paginator import Paginator


# Create your views here.
class UserRegistrationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    @log_exceptions("Error - could not register user")
    def create(self, request):
        """
        Endpoint handles user registration.
        :param request:
        :return:
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            return JsonResponse({"ok": "User account created", "message": "Account created successfully!"})
        else:
            return JsonResponse({"error": "could not register user", "message": "Submited data is not valid"})
