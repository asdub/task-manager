from rest_framework import routers

from tasks.models import Category
from .views import CategoryViewSet

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'Categories')

urlpatterns = router.urls