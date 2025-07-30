import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import MoodSelector from '../components/MoodSelector';
import NoteInput from '../components/NoteInput';
import SubmitButton from '../components/SubmitButton';

export default function MoodCheckInScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation for the glowing border
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateGlow = () => {
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]).start(() => animateGlow());
    };

    animateGlow();
  }, []);

  const handleSubmit = async () => {
    // Dismiss keyboard when submitting
    Keyboard.dismiss();

    if (!selectedMood || !noteText.trim()) {
      Alert.alert("Hold up!", "Please select a mood and write a note.");
      return;
    }

    setIsLoading(true);

    try {
      // First, get the mood details to pass to Brewce
      const moodResponse = await fetch('http://192.168.178.69:8000/api/moods/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!moodResponse.ok) {
        throw new Error('Failed to fetch mood details');
      }

      const moods = await moodResponse.json();
      const selectedMoodData = moods.find(mood => mood.id === selectedMood);

      if (!selectedMoodData) {
        throw new Error('Selected mood not found');
      }

      // Submit the check-in
      const checkinResponse = await fetch('http://192.168.178.69:8000/api/checkins/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          note: noteText,
        }),
      });

      if (!checkinResponse.ok) {
        throw new Error('Failed to submit check-in');
      }

      const checkinData = await checkinResponse.json();

      // Get Brewce's response
      const brewceResponse = await fetch('http://192.168.178.69:8000/api/brewce/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood_name: selectedMoodData.name,
          mood_emoji: selectedMoodData.emoji,
          coffee_recommendation: selectedMoodData.coffee_recommendation,
          note: noteText,
        }),
      });

      if (!brewceResponse.ok) {
        throw new Error('Failed to get Brewce response');
      }

      const brewceData = await brewceResponse.json();

      // Combine the data
      const combinedData = {
        ...checkinData,
        brewce_says: brewceData.brewce_says,
      };

      // Navigate to results screen with the data
      navigation.navigate('Results', { responseData: combinedData });
    } catch (err) {
      console.error(err);
      Alert.alert("Oops!", "Could not fetch response from Brewce.");
      setIsLoading(false);
    }
  };

  // View can be changed to scrollview if when keyboard is open, you can't see the text behind it and you need the ability to scroll.
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* App Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>☕ Bean There Lite</Text>
          <Text style={styles.subtitle}>Coffee Therapy with Brewce Wayne</Text>
        </View>

                {/* Glowing Card */}
        <Animated.View
          style={[
            styles.card,
            {
              shadowColor: '#8a46ff',
              shadowOpacity: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
              shadowRadius: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 20],
              }),
              elevation: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 15],
              }),
            }
          ]}
        >
          <Text style={styles.cardTitle}>How are you feeling today?</Text>

          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
          <NoteInput value={noteText} onChange={setNoteText} />

          <SubmitButton
            onPress={handleSubmit}
            isLoading={isLoading}
            disabled={!selectedMood || !noteText.trim()}
          >
            Check in
          </SubmitButton>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    color: '#8a46ff',
    fontFamily: 'SpaceGrotesk-Bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#8a46ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Inter',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#8a46ff',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: '#f5f5f5',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});
