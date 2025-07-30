import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// Removed hardcoded MOODS array

export default function MoodSelector({ selected, onSelect }) {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch('http://192.168.178.69:8000/api/moods/');
        if (!response.ok) throw new Error('Failed to fetch moods');
        const data = await response.json();
        setMoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8a46ff" />
        <Text style={styles.loadingText}>Loading moods...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your mood:</Text>
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.emojiButton,
              selected === mood.id && styles.selected,
            ]}
            onPress={() => onSelect(mood.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  emojiButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
    minWidth: 60,
    alignItems: 'center',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#8a46ff',
    backgroundColor: '#3a2a4a',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  emoji: {
    fontSize: 32,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: '#f5f5f5',
    marginTop: 8,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: '#f87171',
    fontSize: 16,
  },
});
