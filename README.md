# ☕ Bean There Lite

A mood-based coffee journal and roast therapist app. Check in with your emotions and receive custom coffee recommendations, sassy affirmational roasts, and chat with **Brewce Wayne** - a snarky, unhinged barista therapist.

## 🚀 Features

- **Mood Check-ins**: Select your mood with emoji picker
- **Coffee Recommendations**: Get personalized coffee suggestions based on your mood
- **Affirmational Roasts**: Receive sassy, therapeutic roasts that turn your feelings into coffee metaphors
- **Brewce Wayne**: AI-powered barista therapist who gives poetic, sarcastic advice
- **Spotify Integration**: Get mood-matched music recommendations
- **Dark Mode UI**: Beautiful, moody coffee shop aesthetic

## 🛠 Tech Stack

### Backend
- **Django 4.2** + Django REST Framework
- **SQLite** database (development)
- **OpenAI GPT-4** for Brewce's responses
- **CORS** enabled for cross-origin requests

### Frontend
- **React Native** with Expo
- **Modular components** with clean, reusable props
- **Dark mode** design with neon purple accents
- **Responsive** mobile-first design

## 📱 App Flow

1. **Select Mood**: Choose from 6 different moods (Sadness, Happiness, Motivated, Uncertain, Unstoppable, Chill)
2. **Write Note**: Share what's brewing on your mind
3. **Submit**: Get your personalized coffee recommendation and roast
4. **Brewce Response**: Receive AI-generated therapeutic advice from Brewce Wayne
5. **Spotify**: Tap to listen to mood-matched music

## 🏃‍♂️ Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Expo CLI (`npm install -g @expo/cli`)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd bean_backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip3 install -r ../requirements.txt
   ```

3. **Run migrations:**
   ```bash
   python3 manage.py migrate
   ```

4. **Seed the database:**
   ```bash
   python3 manage.py shell -c "from coffee.seeds import run; run()"
   ```

5. **Start Django server:**
   ```bash
   python3 manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd bean-there-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Expo development server:**
   ```bash
   npm start
   ```

4. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 🔌 API Endpoints

### GET `/api/moods/`
Returns all available moods with their coffee recommendations and roasts.

### POST `/api/checkins/`
Submit a mood check-in.
```json
{
  "mood": 1,
  "note": "Feeling a bit down today"
}
```

### POST `/api/brewce/`
Get Brewce Wayne's AI response.
```json
{
  "mood_name": "Sadness",
  "mood_emoji": "😭",
  "coffee_recommendation": "French press brewed with your tears.",
  "note": "Feeling a bit down today"
}
```

## 🎨 Design Philosophy

- **Dark Mode**: Easy on the eyes, perfect for late-night coffee sessions
- **Neon Purple Accents**: `#8a46ff` for primary actions and highlights
- **Coffee Shop Vibes**: Moody, introspective, snarky attitude
- **Micro-interactions**: Subtle animations and feedback
- **Typography**: Inter for UI, Courier New for Brewce's typewriter effect

## 🧠 Brewce Wayne

Brewce Wayne is your AI barista therapist who:
- Turns emotions into coffee metaphors
- Provides sarcastic but therapeutic advice
- Uses poetic, unhinged language
- Gives shockingly real insights

## 🔮 Future Features

- [ ] Mood tracking over time (graph view)
- [ ] Journal history
- [ ] Conversation thread with Brewce
- [ ] Daily Brewce push notifications
- [ ] Voice generation with ElevenLabs
- [ ] Save favorite roasts
- [ ] Rate limiting & spam protection

## 🐛 Troubleshooting

### Backend Issues
- **OpenAI API Error**: Set `OPENAI_API_KEY` in your `.env` file
- **CORS Issues**: Backend includes CORS headers for development
- **Database Issues**: Run `python3 manage.py migrate` to apply migrations

### Frontend Issues
- **API Connection**: Ensure backend is running on `localhost:8000`
- **Expo Issues**: Try `expo doctor` to diagnose problems
- **Device Connection**: Use Expo Go app or simulator for testing

## 📝 Development Notes

- **State Management**: Currently using local state (`useState`). May explore Zustand or Redux for complex state later.
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Visual feedback during API calls
- **Accessibility**: WCAG AA compliant contrast ratios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ☕ and ❤️ by the Bean There Lite team**
