from urllib import response
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

from tasks.models import Task, Category


User = get_user_model()

class TestTasksCreate(APITestCase):

    @classmethod
    def setUpTestData(cls):
        # Create user object, Catecory & Task JSON for TestTasksCreate tests
        cls.user = User.objects.create_user(
            username='testuser', 
            email='test@test.com',
            password='12345'
        )

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
        # Login & create token for each request
        self.token = Token.objects.create(user=self.user)
        self.client.login(username=self.user.username, password=self.user.password)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


    def test_task_dashboard_completion(self):
        # Create and test category
        cat_response = self.client.post(reverse('categories-list'), self.sample_category, format='json')
        self.assertEqual(cat_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')

        # Create task via api and db query, test and update task object completion status and test
        task_response = self.client.post(reverse('tasks-list'), self.sample_task, format='json')
        self.assertEqual(task_response.status_code, status.HTTP_201_CREATED)
        Task.objects.filter(pk=1).update(completed=True)
        task_false = Task.objects.get(pk=1)
        task_false.pk = None
        task_false.id = None
        task_false.completed = False
        task_false.save()

        # Check dashboard response equals expected data
        dash_response = self.client.get(reverse('tasks-completion-list'))
        self.assertEqual(dash_response.status_code, status.HTTP_200_OK)
        self.assertEqual(dash_response.data, [{'completed': False, 'count': 1}, {'completed': True, 'count': 1}])
        print(f'Task Dashboard Response: {dash_response.status_code}')
       
