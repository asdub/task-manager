from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created = models.DateTimeField(auto_now_add=True)
    
