from django.contrib import admin
from .models import Task, Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'created_at')
    list_filter = ('created_at', 'owner')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'status', 'assigned_to', 'due_date')
    list_filter = ('status', 'project', 'assigned_to', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'description', 'project')
        }),
        ('Asignación', {
            'fields': ('assigned_to', 'status')
        }),
        ('Fechas', {
            'fields': ('due_date', 'created_at', 'updated_at')
        }),
    )
