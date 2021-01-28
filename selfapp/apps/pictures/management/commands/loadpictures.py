from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from selfapp.apps.pictures.models import Picture
from django.core.files import File


class Command(BaseCommand):
    help = 'Upload picture for user John Doe'

    def add_arguments(self, parser):
        parser.add_argument('picture', type=str, help="The image to be uploaded")

    def handle(self, *args, **kwargs):
        """
        Upload new picture and assign it to John Doe's account.
        :param args:
        :param kwargs:
        :return:
        """
        try:
            picture_address = str(kwargs['picture']).split("/")[-1]
            user = User.objects.get(username="johndoe@johndoe.com")
            new_picture = Picture(image=File(open(picture_address, "rb")), caption="Uploaded with command manager",
                                  user=user)
            new_picture.save()

            self.stdout.write(self.style.SUCCESS('Successfully uploaded picture for John Doe\'s account.'))
            return
        except Exception as e:
            print(e)
            self.stdout.write(
                self.style.ERROR(
                    'Could not upload picture. Make sure John Doe\'s account already exists and the passed image is correct.'))
            return
