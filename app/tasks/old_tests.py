from urllib import response
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

from .models import Task, Category


User = get_user_model()

class TestTasksCreate(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', 
            email='test@test.com',
            password='12345'
        )
        self.url = reverse('customuser-list')
        
        userdata = {
            'username': 'foobar',
            'email': 'foobar@example.com',
            'password': 'somepassword'
        }
        self.token = Token.objects.create(user=self.user)
        response = self.client.post(self.url, userdata, format='json')
        print(f'User Setup Response: {response}')
        
        # auth = self.client.post(reverse('login'), {'username': userdata['username'], 'password': userdata['password']}, format='json')
        # self.assertEqual(auth.status_code, status.HTTP_200_OK)
        # self.assertTrue("auth_token" in auth.data)
        # self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {auth.data['auth_token']}")
        

    # def test_task_create_no_auth(self):
        
    #     sample_task = {
    #         'title': 'Test Task',
    #         'description': 'Test Task Description',
    #         'created': '',
    #         'completed': True,
    #         'priority': 2,
    #         'category': '',
    #         'created_by': '',

    #     }
    #     response = self.client.post(reverse('tasks-detail', kwargs={'pk': 1}), sample_task)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_category_create_with_auth(self):
    #     self.sample_category = {
    #         'name': 'Test Category', 
    #         'color': 'FFC0CB', 
    #     }
    #     self.client.login(username='foobar', password='somepassword')
    #     self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    #     response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
    #     print("CAT RESPONSE:", response.json())
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_category_create_with_auth(self):
        self.client.login(username='foobar', password='somepassword')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.sample_category = {
            'name': 'Test Category', 
            'color': 'FFC0CB', 
        }

        response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        print(f'Category Create Response: {response}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')


    def test_task_create_with_auth(self):
        self.client.login(username='foobar', password='somepassword')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.sample_category = {
            'name': 'Test Category', 
            'color': 'FFC0CB', 
        }
        
        self.sample_task = {
            'title': 'Test Task',
            'description': 'Test Task Description',
            'created': '',
            'completed': True,
            'priority': 2,
            'category': 1,
            'created_by': self.user.id,

        }

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