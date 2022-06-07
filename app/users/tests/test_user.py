from urllib import response
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

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
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + login_response.data['auth_token'])


    def test_login(self):
        # Create and check test category
        cat_response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        self.assertEqual(cat_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')
        print(f'Category Create Response: {cat_response.status_code}')

        # Create and check test task
        task_response = self.client.post(reverse('tasks-list'), self.sample_task, format='json')
        self.assertEqual(task_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test Task')
        print(f'Task Create Response: {task_response.status_code}')

        dash_response = self.client.get(reverse('tasks-completion-list'))
        print(dash_response.json())