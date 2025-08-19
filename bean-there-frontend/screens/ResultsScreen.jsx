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
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.coffeeIcon}>☕</Text>
          </View>
          <Text style={styles.title}>Your Coffee Therapy</Text>
          <Text style={styles.subtitle}>Brewce has prepared your personalized experience</Text>
        </View>

        {/* Response Card */}
        <View style={styles.cardContainer}>
          <ResponseCard
            coffee={responseData.coffee_recommendation}
            roast={responseData.affirmational_roast}
            brewce={responseData.brewce_says}
            spotify_track_link={responseData.spotify_track_link}
          />
        </View>

        {/* New Check-in Button */}
        <TouchableOpacity style={styles.newCheckInButton} onPress={handleNewCheckIn}>
          <Text style={styles.newCheckInText}>☕ New Check-in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    paddingVertical: 40,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8a46ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 16,
  },
  coffeeIcon: {
    fontSize: 32,
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a5a5a5',
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  newCheckInButton: {
    backgroundColor: '#8a46ff',
    borderColor: '#9a56ff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  newCheckInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
