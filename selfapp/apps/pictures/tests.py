from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.test import Client
from rest_framework.test import APIClient


class UserAuthenticatedTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(first_name="John", last_name="Doe", username="john", email="johndoe@johndoe.comcom")
        user.set_password("JohnDoesPassword123")
        user.save()

        self.client = APIClient()

        response = self.client.post('/auth/token/', {'username': 'john', 'password': 'JohnDoesPassword123'})
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_picture_list(self):
        """Check endpoint returning list of pictures uploaded by the user"""
        response = self.client.get('/pictures/upload/', {'page': '1'}, format='json')

        self.assertEqual(response.status_code, 200)
        expectedKeys = ['lastPage', 'images']
        for key in expectedKeys:
            self.assertTrue(key in response.json())

    def test_dashboard_view(self):
        """Check dashboard view endpoint"""
        response = self.client.get('/pictures/dashboard/', {'page': '1'}, format='json')

        self.assertEqual(response.status_code, 200)
        expectedKeys = ['no_pictures', 'picture']
        for key in expectedKeys:
            self.assertTrue(key in response.json())
