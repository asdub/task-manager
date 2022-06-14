from urllib import response
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator

from tasks.models import Task, Category


User = get_user_model()

class TestUser(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username='testuser', 
            email='test@test.com',
            password='12345'
        )

        cls.userdata = {
            'username': 'foobar',
            'email': 'foobar@example.com',
            'password': 'somepassword'
        }

        cls.sample_category = {
            'name': 'Test Category', 
            'color': 'FFC0CB', 
        }

        cls.sample_task = {
            'title': 'Test Task',
            'description': 'Test Task Description',
            'created': '',
            'completed': True,
            'priority': 2,
            'category': 1,
            'created_by': cls.user.id,

        }


    def setUp(self):
        # Register user
        register_response = self.client.post(reverse('customuser-list'), self.userdata, format='json')
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)
        
        # Authenticate user
        login_response = self.client.post(
            reverse('login'), 
            {
                'username': self.userdata['username'], 
                'password': self.userdata['password']
            }, 
            format='json'
            )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK )
        self.token = 'Token ' + login_response.data['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION=self.token)


    def test_login(self):
        # Create and check test category
        cat_response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        self.assertEqual(cat_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')
        print(f'Login Category Post Response: {cat_response.status_code}')

    
    def test_logout(self):
        logout_response = self.client.post(reverse('logout'), self.token, format='json')
        self.assertEqual(logout_response.status_code, status.HTTP_204_NO_CONTENT)
        print(f'Logout Responce: {logout_response.status_code}')

    
    def test_passwortd_reset(self):
        self.client.logout()

        data = {
            'email': self.user.email,
            'g_recaptcha_response': '1'
        }
        # Test Password Reset Request
        reset_responce = self.client.post(reverse('customuser-reset-password'), data, format='json')
        self.assertEqual(reset_responce.status_code, status.HTTP_204_NO_CONTENT)
        print(f'Reset Responce: {reset_responce.status_code}')

        # Test Password Reset Confirmation Request
        confirmation_data = {
            'new_password': 'newpassword123!',
            're_new_password': 'newpassword123!',
            'uid': 'MQ',
            'token': default_token_generator.make_token(self.user)
        }
        reset__confirmation_responce = self.client.post(reverse('customuser-reset-password-confirm'), confirmation_data, format='json')
        self.assertEqual(reset__confirmation_responce.status_code, status.HTTP_204_NO_CONTENT)
        print(f'Reset Confirmation Responce: {reset__confirmation_responce.status_code}')
      