import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ResponseCard from '../components/ResponseCard';

export default function ResultsScreen({ route, navigation }) {
  const { responseData } = route.params;

  const handleNewCheckIn = () => {
    navigation.navigate('MoodCheckIn');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Coffee Therapy</Text>
      <ResponseCard
        coffee={responseData.coffee_recommendation}
        roast={responseData.affirmational_roast}
        brewce={responseData.brewce_says}
        spotify_track_link={responseData.spotify_track_link}
      />
      <TouchableOpacity style={styles.newCheckInButton} onPress={handleNewCheckIn}>
        <Text style={styles.newCheckInText}>☕ New Check-in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#f5f5f5',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  newCheckInButton: {
    backgroundColor: '#8a46ff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  newCheckInText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});
