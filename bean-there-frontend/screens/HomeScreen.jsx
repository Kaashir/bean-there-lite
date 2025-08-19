import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function HomeScreen({ navigation }) {
  const steamOpacity = new Animated.Value(0);
  const steamTranslateY = new Animated.Value(0);

  useEffect(() => {
    // Start steam animation
    const steamAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(steamOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(steamTranslateY, {
            toValue: -20,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(steamOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(steamTranslateY, {
            toValue: -40,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    steamAnimation.start();

    // Navigate to MoodCheckIn after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('MoodCheckIn');
    }, 2000);

    return () => {
      steamAnimation.stop();
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/bean_there_light_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.welcomeText}>Preparing your coffee</Text>

          {/* Coffee Cup with Steam */}
          <View style={styles.coffeeContainer}>
            <Text style={styles.coffeeCup}>☕</Text>
            <Animated.View
              style={[
                styles.steam,
                {
                  opacity: steamOpacity,
                  transform: [{ translateY: steamTranslateY }],
                },
              ]}
            >
              <Text style={styles.steamText}>💨</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
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
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  welcomeText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  coffeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeCup: {
    fontSize: 60,
    color: '#ff6b35',
  },
  steam: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  steamText: {
    fontSize: 30,
    color: '#ff6b35',
  },
});
