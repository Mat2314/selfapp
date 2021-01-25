from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.test import Client
from rest_framework.test import APIClient


class UserUnauthenticatedTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(first_name="John", last_name="Doe", username="john", email="johndoe@johndoe.comcom")
        user.set_password("JohnDoesPassword123")
        user.save()

        self.client = APIClient()

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


class UserAuthenticatedTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(first_name="John", last_name="Doe", username="john", email="johndoe@johndoe.comcom")
        user.set_password("JohnDoesPassword123")
        user.save()

        self.client = APIClient()

        response = self.client.post('/auth/token/', {'username': 'john', 'password': 'JohnDoesPassword123'})
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_get_userdata(self):
        """Test if userdata is returned properly."""
        response = self.client.get('/auth/user/', format='json')
        self.assertEqual(response.status_code, 200)

        returnedKeys = ['name', 'profile_image']
        for key in returnedKeys:
            self.assertTrue(key in response.json())

    def test_change_password(self):
        """Test change password endpoint"""
        # Try with 2 different passwords
        response = self.client.put('/auth/user/',
                                   {"old_password": "JohnDoesPassword123", "new_password": "JohnsNewPassword123",
                                    "new_password_repeat": "123"}, format='json')

        self.assertEqual(response.status_code, 200)
        returnedKeys = ['error', 'message']
        for key in returnedKeys:
            self.assertTrue(key in response.json())

        # Try with incorrect password
        response = self.client.put('/auth/user/',
                                   {"old_password": "123", "new_password": "JohnsNewPassword",
                                    "new_password_repeat": "JohnsNewPassword"}, format='json')
        self.assertEqual(response.status_code, 200)
        returnedKeys = ['error', 'message']
        for key in returnedKeys:
            self.assertTrue(key in response.json())

        # Try with legitimate data
        response = self.client.put('/auth/user/',
                                   {"old_password": "JohnDoesPassword123", "new_password": "JohnsNewPassword",
                                    "new_password_repeat": "JohnsNewPassword"}, format='json')

        self.assertEqual(response.status_code, 200)
        returnedKeys = ['ok', 'message']
        for key in returnedKeys:
            self.assertTrue(key in response.json())

    def test_delete_account(self):
        """Test checks if removing account works correctly"""
        response = self.client.delete('/auth/user/', format='json')

        self.assertEqual(response.status_code, 200)
        returnedKeys = ['ok', 'message']
        for key in returnedKeys:
            self.assertTrue(key in response.json())
