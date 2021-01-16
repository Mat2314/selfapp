from selfapp.apps.pictures.models import Picture
from rest_framework import serializers


class PictureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Picture
        fields = '__all__'
