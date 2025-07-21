from django.shortcuts import render
from rest_framework import viewsets
from .models import Mood
from .serializers import MoodSerializer

# Create your views here.
class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer
