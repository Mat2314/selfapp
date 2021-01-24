from selfapp.apps.pictures.models import Picture
from rest_framework import serializers


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'image', 'caption', 'date', 'is_profile']
