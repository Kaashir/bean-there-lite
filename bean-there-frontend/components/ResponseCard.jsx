import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function ResponseCard({ coffee, roast, brewce, spotify_track_link }) {
  const openSpotify = () => {
    if (spotify_track_link) {
      Linking.openURL(spotify_track_link);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.section}>
        <Text style={styles.label}>☕ Your Coffee:</Text>
        <Text style={styles.value}>{coffee}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🔥 Your Roast:</Text>
        <Text style={styles.roast}>{roast}</Text>
      </View>

      {spotify_track_link && (
        <TouchableOpacity style={styles.spotifyButton} onPress={openSpotify}>
          <Text style={styles.spotifyText}>🎵 Listen on Spotify</Text>
        </TouchableOpacity>
      )}

      {brewce && (
        <View style={styles.brewceSection}>
          <Text style={styles.brewceLabel}>🦇 Brewce Wayne Says:</Text>
          <Text style={styles.brewce}>{brewce}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#8a46ff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  roast: {
    color: '#f5f5f5',
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  spotifyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  brewceSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
  },
  brewceLabel: {
    color: '#8a46ff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  brewce: {
    fontFamily: 'Courier New',
    color: '#f5f5f5',
    fontSize: 15,
    lineHeight: 22,
  },
});
