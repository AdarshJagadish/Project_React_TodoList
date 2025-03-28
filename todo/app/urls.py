from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from django.urls import path, include

# Create a router and register the TaskViewSet
router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')

# Include the router's generated URLs
urlpatterns = [
    path('', include(router.urls)),
]
