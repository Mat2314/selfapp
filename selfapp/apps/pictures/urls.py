from django.urls import include
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'upload', views.PictureViewSet)

urlpatterns = [
    url('', include(router.urls)),
]
