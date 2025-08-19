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
      {/* Coffee Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.icon}>☕</Text>
          <Text style={styles.label}>Your Coffee</Text>
        </View>
        <Text style={styles.value}>{coffee}</Text>
      </View>

      {/* Roast Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.icon}>🔥</Text>
          <Text style={styles.label}>Your Roast</Text>
        </View>
        <Text style={styles.roast}>{roast}</Text>
      </View>

      {/* Spotify Button */}
      {spotify_track_link && (
        <TouchableOpacity style={styles.spotifyButton} onPress={openSpotify}>
          <Text style={styles.spotifyText}>🎵 Listen on Spotify</Text>
        </TouchableOpacity>
      )}

      {/* Brewce Section */}
      {brewce && (
        <View style={styles.brewceSection}>
          <View style={styles.divider} />
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.icon}>🦇</Text>
              <Text style={styles.label}>Brewce Wayne Says</Text>
            </View>
            <Text style={styles.brewce}>{brewce}</Text>
          </View>
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
    borderWidth: 1,
    borderColor: '#8a46ff',
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    color: '#8a46ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  roast: {
    color: '#f5f5f5',
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  spotifyButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  spotifyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  brewceSection: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#4a4a4a',
    marginBottom: 16,
  },
  brewce: {
    fontFamily: 'monospace',
    color: '#f5f5f5',
    fontSize: 15,
    lineHeight: 22,
  },
});
