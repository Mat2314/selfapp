from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from selfapp.decorators import log_exceptions
from django.http import JsonResponse
from django.core.paginator import Paginator
from selfapp.apps.pictures.models import Picture


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
            print(serializer.errors)
            return JsonResponse({"error": "could not register user", "message": "Submited data is not valid"})


class UserDataViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    @log_exceptions("Error - could not download user data")
    def list(self, request):
        """
        Endpoint returns basic user data - name, surname and profile picture.
        :param request:
        :return:
        """
        user = request.user
        try:
            profile_image = user.pictures.get(is_profile=True).image.url
        except:
            profile_image = ""
        return JsonResponse({"name": user.first_name + " " + user.last_name, "profile_image": profile_image})

    @log_exceptions("Error - could not update profile picture")
    def create(self, request):
        """
        Endpoint updates a profile picture of the user.
        First if there's a previous profile picture it's being deleted.
        Then the uploaded picture is being saved.
        Expected params:
        - picture: Image
        :param request:
        :return:
        """
        print(request.data)
        print(request.FILES)
        picture = request.FILES['picture']
        user = request.user
        try:
            current_profile_picture = user.pictures.get(is_profile=True)
            current_profile_picture.delete()
        except:
            pass
        finally:
            new_picture = Picture(image=picture, is_profile=True, user=user)
            new_picture.save()
        return JsonResponse({"ok": "Picture saved", "message": "Profile picture changed"})

    @log_exceptions("Error - could not change password")
    def put(self, request):
        """
        Endpoint handles password change.
        Expected params:
        - old_password
        - new_password
        - new_password_repeat
        :param request:
        :return:
        """
        user = request.user
        if user.check_password(request.data['old_password']):
            if request.data['new_password_repeat'] == request.data['new_password']:
                user.set_password(request.data['new_password'])
                return JsonResponse({"ok": "password changed", "message": "Password changed successfully"})
            else:
                return JsonResponse({"error": "passwords do not match", "message": "Inserted passwords do not match"})
        else:
            return JsonResponse({"error": "Current password invalid", "message": "Old password is incorrect"})

    @log_exceptions("Error - could not delete user account")
    def delete(self, request):
        """
        Endpoint handles user account removal.
        :param request:
        :return:
        """
        user = request.user
        user.delete()
        return JsonResponse({"ok": "Account removed :(((", "message": "Account removed successfully"})
