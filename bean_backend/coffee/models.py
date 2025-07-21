from django.db import models

# Create your models here.
class Mood(models.Model):
    name = models.CharField(max_length=50)
    coffee_recommendation = models.TextField
    emoji = models.CharField(max_length=10, default='☕')

    def __str__(self):
        return self.name
