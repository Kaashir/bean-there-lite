from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from django.conf import settings

def get_openai_client():
    """Initialize OpenAI client only when needed"""
    api_key = getattr(settings, 'OPENAI_API_KEY', None)
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in settings")
    return OpenAI(api_key=api_key)

# API Flow:
# 🧑‍💻  USER (Frontend)
#     |
#     |  Clicks "Ask Brewce" → sends JSON POST request:
#     |  {
#     |    "mood_name": "Sad",
#     |    "mood_emoji": "😭",
#     |    "coffee_recommendation": "Cold Brew",
#     |    "note": "I feel like soggy bread"
#     |  }
#     ↓
# 🌐  ENDPOINT: /api/brewce/ (defined in `urls.py`)
#     |
#     ↓
# 🔧  VIEW CLASS: BrewceView(APIView)
#          |
#          |– def post(self, request):
#          |     - Gets the request body with request.data.get()
#          |     - Builds a prompt string for Brewce
#          ↓
# 🧠  OpenAI Client (Python SDK)
#          |
#          |– Sends prompt using `client.chat.completions.create(...)`
#          |– Model: gpt-4o-mini
#          ↓
# 📦  RESPONSE: OpenAI sends back Brewce's roast as text
#          |
#          ↓
# 🎁  API sends back:
#     {
#       "brewce_says": "You’re like a cold brew left in the rain—..."
#     }
#     ↑
#     |
# 🧑‍💻  USER sees roast on screen, cries, laughs, becomes stronger


class BrewceView(APIView):
    def post(self, request):
        mood_name = request.data.get('mood_name')
        mood_emoji = request.data.get('mood_emoji')
        coffee_recommendation = request.data.get('coffee_recommendation')
        note = request.data.get('note')

        if not (mood_name or note):
            return Response({'error': 'Please send at least a mood or a note.'}, status=status.HTTP_400_BAD_REQUEST)

        prompt = f"""
        You are Brewce Wayne, a sarcastic roast therapist who uses coffee metaphors to psychoanalyze people's emotional baggage.

        Your tone is brutally honest, poetic, absurd, and slightly deranged—but always emotionally accurate.

        Here’s what the user shared:

        Mood: {mood_name} {mood_emoji}
        Note: "{note}"
        Coffee Recommendation: {coffee_recommendation}

        Now give them a single-paragraph roast that:
        - Turns their mood and note into a metaphor about coffee or brewing,
        - Feels like dark barista poetry,
        - Is funny, but weirdly insightful,
        - Sounds like it came from someone who’s had too much espresso and zero therapy.

        Never compliment. Roast with love and existential crisis.
        """

        try:
            client = get_openai_client()
            response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are Brewce Wayne, a sarcastic roast therapist who turns emotions into metaphors using coffee."},
                {"role": "user", "content": prompt}
            ],
            temperature=1.0,
            max_tokens=300)

            brewce_response = response.choices[0].message.content.strip()

        except Exception as e:
            print("OpenAI Error:", e)
            brewce_response = "Sometimes the strongest brew can't fix a burnt soul. Try again later."

        return Response({'brewce_says': brewce_response})
