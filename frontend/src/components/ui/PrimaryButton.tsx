import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@constants/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function PrimaryButton({ title, onPress, disabled, loading, style, textStyle }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={[styles.gradient, disabled && styles.disabledGradient]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.surface} />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 52,
    justifyContent: 'center',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.65,
  },
  disabledGradient: {
    backgroundColor: COLORS.border,
  },
  text: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
