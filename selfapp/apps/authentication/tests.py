from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client


class UserTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(first_name="John", last_name="Doe", username="john", email="johndoe@johndoe.comcom")
        user.set_password("JohnDoesPassword123")
        user.save()

        self.client = Client()

    def test_user_gets_authenticated(self):
        """Test checks if endpoint returns proper value for user with legit credentials."""
        response = self.client.post('/auth/token/', {'username': 'john', 'password': 'JohnDoesPassword123'})
        self.assertEqual(response.status_code, 200)

    def test_user_unauthenticated(self):
        """Test if endpoint returns proper value for non-legit credentials"""
        response = self.client.post('/auth/token/', {'username': 'trash', 'password': 'trash'})
        self.assertEqual(response.status_code, 401)

    def test_user_registration(self):
        """Test if user can be registered properly"""
        response = self.client.post('/auth/registration/',
                                    {'username': 'joe', 'first_name': 'Joe', 'last_name': 'Doenovski',
                                     'email': 'joedoenovski@joedoenovski.comcom', 'password': 'JoeDoenovski123',
                                     'repeated_password': 'JoeDoenovski123'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['ok'], "User account created")


