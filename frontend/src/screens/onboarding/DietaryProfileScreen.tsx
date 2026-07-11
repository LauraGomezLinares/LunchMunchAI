import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuthStore } from '@store/authStore';
import { Allergen, DietaryPreference } from '@types';
import PrimaryButton from '@components/ui/PrimaryButton';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';

const preferences: { key: DietaryPreference; label: string }[] = [
  { key: 'vegetarian', label: 'Vegetariano' },
  { key: 'vegan', label: 'Vegano' },
  { key: 'omnivore', label: 'Omnívoro' },
  { key: 'low_carb', label: 'Bajo en carbohidratos' },
  { key: 'high_protein', label: 'Alto en proteínas' },
];

const allergens: { key: Allergen; label: string }[] = [
  { key: 'gluten', label: 'Gluten' },
  { key: 'dairy', label: 'Lácteos' },
  { key: 'nuts', label: 'Frutos secos' },
  { key: 'soy', label: 'Soya' },
  { key: 'seafood', label: 'Mariscos' },
  { key: 'eggs', label: 'Huevos' },
];

export default function DietaryProfileScreen() {
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const [selectedPreferences, setSelectedPreferences] = useState<DietaryPreference[]>(['omnivore']);
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>([]);

  const togglePreference = (value: DietaryPreference) => {
    setSelectedPreferences((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const toggleAllergen = (value: Allergen) => {
    setSelectedAllergens((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const handleSubmit = async () => {
    if (selectedPreferences.length === 0) {
      Alert.alert('Selecciona al menos una preferencia alimentaria');
      return;
    }

    await completeOnboarding({ preferences: selectedPreferences, allergens: selectedAllergens });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Perfil Dietario</Text>
      <Text style={styles.subtitle}>Cuéntanos tus preferencias y alergias para personalizar las recomendaciones.</Text>

      <Text style={styles.sectionTitle}>Preferencias</Text>
      <View style={styles.chipRow}>
        {preferences.map((item) => {
          const active = selectedPreferences.includes(item.key);
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => togglePreference(item.key)}
              accessibilityRole="button"
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Alergias</Text>
      <View style={styles.chipRow}>
        {allergens.map((item) => {
          const active = selectedAllergens.includes(item.key);
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggleAllergen(item.key)}
              accessibilityRole="button"
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <PrimaryButton title="Guardar perfil" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
  },
  heading: {
    ...TYPOGRAPHY.heading,
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  chipText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.surface,
  },
});
