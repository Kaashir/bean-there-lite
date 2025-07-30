import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function NeonBorder({ children, style }) {
  const lightPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateLight = () => {
      Animated.timing(lightPosition, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => {
        lightPosition.setValue(0);
        animateLight();
      });
    };

    animateLight();
  }, []);

  // Calculate the position of the light around the border
  const getLightPosition = () => {
    const progress = lightPosition._value;
    const borderLength = 2 * (400 + 200); // width + height (approximate)

    if (progress < 0.25) {
      // Top border
      return {
        left: progress * 4 * 400,
        top: 0,
        width: 4,
        height: 2,
      };
    } else if (progress < 0.5) {
      // Right border
      return {
        left: 400 - 2,
        top: (progress - 0.25) * 4 * 200,
        width: 2,
        height: 4,
      };
    } else if (progress < 0.75) {
      // Bottom border
      return {
        left: (1 - (progress - 0.5) * 4) * 400,
        top: 200 - 2,
        width: 4,
        height: 2,
      };
    } else {
      // Left border
      return {
        left: 0,
        top: (1 - (progress - 0.75) * 4) * 200,
        width: 2,
        height: 4,
      };
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Main content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Neon border */}
      <View style={styles.borderContainer}>
        {/* Top border */}
        <View style={styles.borderTop} />
        {/* Right border */}
        <View style={styles.borderRight} />
        {/* Bottom border */}
        <View style={styles.borderBottom} />
        {/* Left border */}
        <View style={styles.borderLeft} />

        {/* Moving light */}
        <Animated.View
          style={[
            styles.light,
            getLightPosition(),
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
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
  borderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8a46ff',
    opacity: 0.6,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#8a46ff',
    opacity: 0.6,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8a46ff',
    opacity: 0.6,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#8a46ff',
    opacity: 0.6,
  },
  light: {
    position: 'absolute',
    backgroundColor: '#8a46ff',
    borderRadius: 2,
    shadowColor: '#8a46ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});
