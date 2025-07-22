from django.shortcuts import render
from rest_framework import viewsets
from .models import Mood, MoodCheckin
from .serializers import MoodSerializer, MoodCheckinSerializer

# Create your views here.
class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer

class MoodCheckinViewSet(viewsets.ModelViewSet):
    queryset = MoodCheckin.objects.all()
    serializer_class = MoodCheckinSerializer

