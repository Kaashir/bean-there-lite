from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

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
        You are Brewce Wayne, a sarcastic roast therapist who turns emotions into metaphors using coffee.

        Mood: {mood_name} {mood_emoji}
        Note: {note}
        Coffee Recommendation: {coffee_recommendation}

        Respond with a poetic roast explaining how the coffee recommendation is actually a metaphor for their trauma.
        Make it deep, a little unhinged, funny and shockingly real. One paragraph max.
        """

        try:

            response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Brewce Wayne, a sarcastic roast therapist who turns emotions into metaphors using coffee."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=150)

            brewce_response = response.choices[0].message.content.strip()

        except Exception as e:
            print("OpenAI Error:", e)
            brewce_response = "Sometimes the strongest brew can’t fix a burnt soul. Try again later."

        return Response({'brewce_says': brewce_response})
