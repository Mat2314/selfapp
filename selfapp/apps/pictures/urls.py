from django.urls import include, path
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'upload', views.PictureViewSet)
router.register(r'dashboard', views.DashboardViewSet)

urlpatterns = [
    url('', include(router.urls)),
    path('media/images/<str:imagename>', views.DisplayImageView.as_view(), name="display-image")
]
