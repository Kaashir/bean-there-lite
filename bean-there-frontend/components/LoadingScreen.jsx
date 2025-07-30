import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const steamOpacity = useRef(new Animated.Value(0)).current;
  const steamTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSteam = () => {
      Animated.parallel([
        Animated.timing(steamOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(steamTranslateY, {
          toValue: -20,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        steamOpacity.setValue(0);
        steamTranslateY.setValue(0);
        animateSteam();
      });
    };

    animateSteam();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.coffeeMug}>
        <View style={styles.mugBody}>
          <View style={styles.mugHandle} />
        </View>

        {/* Steam animation */}
        <Animated.View
          style={[
            styles.steam,
            {
              opacity: steamOpacity,
              transform: [{ translateY: steamTranslateY }],
            },
          ]}
        >
          <Text style={styles.steamText}>☁️</Text>
        </Animated.View>
      </View>

      <Text style={styles.loadingText}>Brewing your therapy...</Text>
      <Text style={styles.subText}>Brewce is crafting your roast</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  coffeeMug: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mugBody: {
    width: 80,
    height: 60,
    backgroundColor: '#8a46ff',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mugHandle: {
    position: 'absolute',
    right: -15,
    top: 10,
    width: 20,
    height: 30,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 0,
  },
  steam: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
  },
  steamText: {
    fontSize: 24,
    opacity: 0.7,
  },
  loadingText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#8a46ff',
    fontFamily: 'Inter',
  },
});
