import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import MoodSelector from '../components/MoodSelector';
import NoteInput from '../components/NoteInput';
import { API_ENDPOINTS } from '../config/api';

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
      const moodResponse = await fetch(API_ENDPOINTS.MOODS, {
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
      const checkinResponse = await fetch(API_ENDPOINTS.CHECKINS, {
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
      const brewceResponse = await fetch(API_ENDPOINTS.BREWCE, {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          {/* App Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={styles.coffeeIcon}>☕</Text>
              <Text style={styles.appTitle}>Bean There Lite</Text>
            </View>
            <Text style={styles.subtitle}>Coffee Therapy with Brewce Wayne</Text>
          </View>

          {/* Main Card */}
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

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!selectedMood || !noteText.trim() || isLoading) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!selectedMood || !noteText.trim() || isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Checking in...' : 'Check in ☕'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coffeeIcon: {
    fontSize: 32,
    color: '#8a46ff',
    marginRight: 8,
  },
  appTitle: {
    fontSize: 32,
    color: '#8a46ff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 32,
    width: '100%',
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
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#8a46ff',
    borderColor: '#9a56ff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#4a4a4a',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
