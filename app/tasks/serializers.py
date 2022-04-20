from rest_framework import serializers
from tasks.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class MetaL:
        model = Category
        fields = "__all__"