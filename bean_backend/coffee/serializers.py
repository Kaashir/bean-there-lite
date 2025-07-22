from rest_framework import serializers
from .models import Mood, MoodCheckin

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = '__all__'

class MoodCheckinSerializer(serializers.ModelSerializer):

    # this function gets the mood object with the name Uncertain
    def get_default_mood():
        return Mood.objects.get(name='Uncertain').id

    # This overrides the default "mood" field behavior to display a custom error message and sets uncertain as the default mood
    mood = serializers.PrimaryKeyRelatedField(
        queryset=Mood.objects.all(),
        required=False,
        default=get_default_mood,
        error_messages={
            'does_not_exist': "That mood doesn't exist, bud 😢"}
    )

    # This adds custom validation + friendliness to the note field
    note = serializers.CharField(
        required=True,
        max_length=200,
        error_messages={
            'blank': "Don't leave me hangin'. Give me a note.",
            'required': "A note is required! Tell us how you're feeling.",
            'max_length': "Whoa there, Shakespeare.Please keep it under 200 characters."
        }
    )

    mood_name = serializers.CharField(source='mood.name', read_only=True)
    mood_emoji = serializers.CharField(source='mood.emoji', read_only=True)
    coffee_recommendation = serializers.CharField(source='mood.coffee_recommendation', read_only=True)
    spotify_track_link = serializers.URLField(source='mood.spotify_track_link', read_only=True)
    affirmational_roast = serializers.CharField(source='mood.affirmational_roast', read_only=True)

    class Meta:
        model = MoodCheckin
        fields = ['id', 'mood', 'mood_name', 'mood_emoji', 'coffee_recommendation', 'spotify_track_link', 'affirmational_roast', 'created_at', 'note']
