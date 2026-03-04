from rest_framework import serializers
from .models import Task, Project
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    class Meta:
        model = Task
        fields = "__all__"
        
class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = "__all__"