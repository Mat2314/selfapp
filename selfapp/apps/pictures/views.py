from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import PictureSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from selfapp.decorators import log_exceptions
from django.http import JsonResponse
from .models import Picture


# Create your views here.
class PictureViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = PictureSerializer
    permission_classes = (IsAuthenticated,)

    @log_exceptions("Error - could not upload a picture")
    def create(self, request):
        """
        Endpoint handles uploading pictures by users.
        Pictures are saved in media/images directory.
        Expected parameters:
        - picture : uploaded picture
        - date: date
        - caption: string (optional)
        :param request:
        :return:
        """
        picture = request.FILES['picture']
        new_picture = Picture(image=picture, caption=request.data['caption'], date=request.data['date'],
                              user=request.user)
        new_picture.save()

        return JsonResponse({"ok": "Image saved", "message": "Image was added sucessfully!"})
