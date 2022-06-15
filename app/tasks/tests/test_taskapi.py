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
        self.client.login(
            username=self.user.username,
            password=self.user.password
        )
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_category_create_no_auth(self):
        # Attempt category creation without authorisation
        self.client.logout()
        response = self.client.post(
            reverse('categories-list'),
            self.sample_category,
            format='json'
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )
        print(f'Category No Auth Response: {response.status_code}')

    def test_category_create_patch_delete_with_auth(self):
        # Create and check test category
        response = self.client.post(
            reverse('categories-list'),
            self.sample_category,
            format='json'
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')
        print(f'Category Create Response: {response.status_code}')

        # Patch and check test category
        patch_responce = self.client.patch(
            reverse(
                'categories-detail',
                kwargs={'pk': 1}
            ),
            {
                "name": "Test Patch"
            },
            format='json'
        )
        self.assertEqual(
            patch_responce.status_code,
            status.HTTP_200_OK
        )
        self.assertEqual(Category.objects.get().name, 'Test Patch')
        print(f'Category Patch Response: {patch_responce.status_code}')

        # Delete and check test category
        del_response = self.client.delete(
            reverse(
                'categories-detail',
                kwargs={'pk': 1}
            )
        )
        self.assertEqual(
            del_response.status_code,
            status.HTTP_204_NO_CONTENT
        )
        self.assertEqual(Category.objects.count(), 0)
        print(f'Category Delete Response: {del_response.status_code}')

    def test_task_create_no_auth(self):
        # Attempt task creation without authorisation
        self.client.logout()
        response = self.client.post(
            reverse('tasks-list'),
            self.sample_task,
            format='json'
        )
        print(f'Task Create No Auth Response: {response.status_code}')
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    def test_task_create_patch_delete_with_auth(self):
        # Create and check test category
        cat_response = self.client.post(
            reverse('categories-list'),
            self.sample_category,
            format='json'
        )
        self.assertEqual(
            cat_response.status_code,
            status.HTTP_201_CREATED
        )
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get().name, 'Test Category')
        print(f'Category Create Response: {cat_response.status_code}')

        # Create and check test task
        task_response = self.client.post(
            reverse('tasks-list'),
            self.sample_task,
            format='json'
        )
        self.assertEqual(
            task_response.status_code,
            status.HTTP_201_CREATED
        )
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test Task')
        print(f'Task Create Response: {task_response.status_code}')

        # Patch and check test task
        patch_responce = self.client.patch(
            reverse(
                'tasks-detail',
                kwargs={'pk': 1}
            ),
            {
                "completed": "True"
            },
            format='json'
        )
        self.assertEqual(
            patch_responce.status_code,
            status.HTTP_200_OK
        )
        self.assertEqual(Task.objects.get().completed, True)
        print(f'Task Patch Response: {patch_responce.status_code}')

        # Delete and check test task
        del_response = self.client.delete(
            reverse(
                'tasks-detail',
                kwargs={'pk': 1}
            )
        )
        self.assertEqual(
            del_response.status_code,
            status.HTTP_204_NO_CONTENT
        )
        self.assertEqual(Task.objects.count(), 0)
        print(f'Task Delete Response: {del_response.status_code}')
