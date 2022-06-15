from rest_framework import routers
from .views import (
    CategoryViewSet,
    TaskViewSet,
    DashboardTaskCompletionViewset,
    DashboardByCategoryViewset,
)

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'categories')
router.register(r'api/tasks', TaskViewSet, 'tasks')
router.register(
    r'api/dashboard/tasks-completion',
    DashboardTaskCompletionViewset,
    'tasks-completion'
)
router.register(
    'api/dashboard/tasks-category-distribution',
    DashboardByCategoryViewset,
    'tasks-category-distribution'
)

urlpatterns = router.urls
