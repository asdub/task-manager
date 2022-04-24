from django.db.models import Count
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from .serializers import CategorySerializer, DashboardTaskCompletionSerializer, TaskSerializer
from rest_framework.pagination import PageNumberPagination

from .models import Category, Task
from .permissions import TaskPermission

# Create your views here.
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 6


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        TaskPermission
    ]
    serializer_class = TaskSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields =['completed', '-created']
    ordering = ['completed', '-created']

    def get_queryset(self):
        user = self.request.user
        completed = self.request.query_params.get('completed')
        priority = self.request.query_params.get('priority')
        category = self.request.query_params.get('category')
        query_params = {}

        if completed is not None:
            query_params["completed"] = completed

        if priority is not None:
            query_params["priority"] = priority
        
        if category is not None:
            query_params["category"] = category

        return Task.objects.filter(created_by=user, **query_params)

    def perform_create(self, serializer):
        return serializer.save(created_by=self.request.user)


class DashboardTaskCompletionViewset(viewsets.ViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        user = self.request.user
        queryset = Task.objects.filter(created_by=user).values('completed').annotate(count=Count('completed'))
        serializer = DashboardTaskCompletionSerializer(queryset, many=True)
        return Response(serializer.data)
