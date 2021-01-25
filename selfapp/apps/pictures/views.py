from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import PictureSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from selfapp.decorators import log_exceptions
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from .models import Picture
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.core.paginator import Paginator


# Create your views here.
class PictureViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = PictureSerializer
    permission_classes = (IsAuthenticated,)

    @log_exceptions("Error - could not get user's pictures")
    def list(self, request):
        """
        Endpoint returns paginated list of pictures with captions and the date.
        Expected parameters:
        - page: number
        """
        # Get pictures
        page = int(self.request.query_params.get('page'))
        pictures = list(
            request.user.pictures.filter(is_profile=False).order_by('-date').values('id', 'image', 'caption', 'date',
                                                                                    'is_profile'))

        # Paginate
        paginator = Paginator(pictures, 5)
        page_objects = paginator.page(page).object_list

        data = dict()
        data['lastPage'] = paginator.num_pages
        data['images'] = page_objects
        return Response(data)

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

    @log_exceptions("Error - could not delete picture")
    def delete(self, request):
        """
        Endpoint removes a picture with given id.
        Expected params:
        - picture_id: id
        :param request:
        :return:
        """
        user = request.user
        picture_id = self.request.query_params.get('picture_id')
        picture = Picture.objects.get(id=picture_id)

        if picture not in user.pictures.all():
            # If the picture does not belong to authenticated user
            return JsonResponse({"error": "Action not allowed - potential security violation detected",
                                 "message": "Potential security violation detected"})

        picture.delete()
        return JsonResponse({"ok": "Picture deleted", "message": "Picture deleted successfully"})


class DisplayImageView(APIView):
    permission_classes = (IsAuthenticated,)

    @log_exceptions("Error - could not display the image")
    def get(self, request, imagename):
        """
        Endpoint displays particular image.
        /media/images/...
        """
        image_path = f'media/images/{imagename}'
        image_data = open(image_path, "rb").read()
        return HttpResponse(image_data, content_type="image/*")
