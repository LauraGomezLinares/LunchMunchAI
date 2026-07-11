import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';
import { useAuthStore } from '@store/authStore';

export default function SplashScreen() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LunchMunchAI</Text>
      <Text style={styles.subtitle}>Alimenta tu día con ideas frescas desde casa.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: COLORS.primary,
    ...TYPOGRAPHY.heading,
    fontSize: 32,
    marginBottom: 16,
  },
  subtitle: {
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.subtitle,
    textAlign: 'center',
  },
});
