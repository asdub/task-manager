from pyexpat import model
from tkinter import CASCADE
from unicodedata import category
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name="categories", 
        on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name



class Task(models.Model):

    class Priority(models.IntegerChoices):
        LOW = 1, "Low"
        MEDIUM = 2, "Medium"
        HIGH = 3, "High"
        URGENT = 4, "Urgent"


    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    due_by = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    completed_on = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    completed = models.BooleanField(default=False)
    priority = models.PositiveBigIntegerField(
        choices=Priority.choices, 
        default=Priority.MEDIUM
    )
    category = models.ForeignKey(Category, 
        related_name="tasks",
        on_delete=models.CASCADE
    )
    created_by = models.ForeignKey(User,
        related_name="tasks",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title
