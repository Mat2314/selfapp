from django.urls import include
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'registration', views.UserRegistrationViewSet)

urlpatterns = [
    url('', include(router.urls)),
    url('^token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('^refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
