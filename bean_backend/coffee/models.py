from django.db import models

# Create your models here.
class Mood(models.Model):
    name = models.CharField(max_length=50)
    coffee_recommendation = models.TextField(blank=True)
    emoji = models.CharField(max_length=10, default='☕')
    spotify_track_link = models.URLField(blank=True)
    affirmational_roast = models.TextField(blank=True)

    def __str__(self):
        return self.emoji

class MoodCheckin(models.Model):
    mood = models.ForeignKey(Mood, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True)

    def __str__(self):
        return self.mood.name
