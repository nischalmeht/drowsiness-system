from django.urls import path
from . import views

urlpatterns = [
    path('detect_drowsiness/', views.detect_drowsiness_api, name='detect_drowsiness'),
]
