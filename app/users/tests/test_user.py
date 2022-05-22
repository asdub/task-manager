from urllib import response
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


User = get_user_model()

class TestTasksCreate(APITestCase):

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
        self.url = reverse('customuser-list')
        self.token = Token.objects.create(user=self.user)
        response = self.client.post(self.url, self.user, format='json')
        print(f'User Setup Response: {response}')

        self.client.login(username=self.user.username, password=self.user.password)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
 

    def test_category_create_with_auth(self):
        response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        print(f'Category Create Response: {response}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')


    def test_task_create_with_auth(self):
        cat_response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        print(f'Category Create Response: {cat_response}')
        self.assertEqual(cat_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')

        task_response = self.client.post(reverse('tasks-list'), self.sample_task, format='json')
        print(f'Task Create Response: {task_response}')
        self.assertEqual(task_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test Task')