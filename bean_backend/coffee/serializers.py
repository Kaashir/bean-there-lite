from rest_framework import serializers
from .models import Mood, MoodCheckin

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = '__all__'

class MoodCheckinSerializer(serializers.ModelSerializer):
    mood_name = serializers.CharField(source='mood.name', read_only=True)
    mood_emoji = serializers.CharField(source='mood.emoji', read_only=True)
    coffee_recommendation = serializers.CharField(source='mood.coffee_recommendation', read_only=True)

    class Meta:
        model = MoodCheckin
        fields = ['id', 'mood', 'mood_name', 'mood_emoji', 'coffee_recommendation', 'created_at', 'note']
