from rest_framework import routers
from .views import CategoryViewSet, TaskViewSet, DashboardTaskCompletionViewset

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'categories')
router.register(r'api/tasks', TaskViewSet, 'tasks')
router.register(r'api/dashboard/tasks-completion', 
DashboardTaskCompletionViewset, 'tasks-completion')

urlpatterns = router.urls