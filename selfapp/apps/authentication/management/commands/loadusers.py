from django.core.management.base import BaseCommand, CommandError
from csv import reader
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create user accounts by reading data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('file', type=str, help="The file from which the data should be uploaded")

    def handle(self, *args, **kwargs):
        """
        Create user accounts. Read the data from CSV file (media/csv_files/) with the following structure:
        first_name,last_name,email,password
        :param args:
        :param kwargs:
        :return:
        """

        _file = kwargs['file']
        with open(_file, 'r') as read_obj:
            csv_reader = reader(read_obj, delimiter=",")
            header = next(csv_reader)

            for row in csv_reader:
                # Add User accounts
                new_user = User(first_name=row[0], last_name=row[1], email=row[2], username=row[2])
                new_user.set_password(row[3])
                new_user.save()

        self.stdout.write(self.style.SUCCESS('Successfully created user accounts'))
