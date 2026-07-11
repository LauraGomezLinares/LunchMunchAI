import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export default function Button({ title, onPress, variant = 'primary', style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.primary,
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.surfaceAlt },
  pressed: { opacity: 0.9 },
  text: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.surface },
});
