from .models import Mood

def run():
    mood_data = [
        {
            "name": "Sadness",
            "emoji": "😭",
            "coffee_recommendation": "French press brewed with your tears.",
            "spotify_track_link": "https://open.spotify.com/track/7k4t7uLgtOxPwTpFmtJNTY",  # Sad vibes
            "affirmational_roast": "You're not weak, you're just flavorfully soggy inside."
        },
        {
            "name": "Unstoppable",
            "emoji": "🔥",
            "coffee_recommendation": "Quad espresso shot with rocket fuel foam.",
            "spotify_track_link": "https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ",  # Hype anthem
            "affirmational_roast": "You could eat the sun if you wanted. But don't. You're hot enough."
        },
        {
            "name": "Uncertain",
            "emoji": "🤷",
            "coffee_recommendation": "Mystery mug. Is it coffee? Is it soup? Who knows.",
            "spotify_track_link": "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",  # Vibe-y confusion
            "affirmational_roast": "You're like a beautiful shrug in human form."
        },
        {
            "name": "Motivated",
            "emoji": "💪",
            "coffee_recommendation": "Bulletproof coffee with pure ambition foam.",
            "spotify_track_link": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",  # Go-mode
            "affirmational_roast": "You’re caffeine with legs. You intimidate espresso itself."
        },
        {
            "name": "Chill",
            "emoji": "😎",
            "coffee_recommendation": "Cold brew with coconut milk and 0 cares given.",
            "spotify_track_link": "https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed",  # Laid-back
            "affirmational_roast": "You're so cool you make iced coffee shiver."
        }
    ]

    for mood in mood_data:
        Mood.objects.update_or_create(
            name=mood["name"],
            defaults=mood
        )

    print("🌱 Mood seeds planted successfully!")
