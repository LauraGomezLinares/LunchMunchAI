import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';
import { RouteNames } from '@constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const slides = [
  {
    title: 'Planifica comidas rápidas y nutritivas',
    description: 'Usa tus ingredientes disponibles para generar recetas con balance y sabor.',
  },
  {
    title: 'Controla tu despensa con facilidad',
    description: 'Añade, elimina y revisa los ingredientes que tienes en casa.',
  },
  {
    title: 'Descubre mercados cercanos en Lima',
    description: 'Encuentra opciones frescas sin salir de tu zona.',
  },
];

type Props = NativeStackScreenProps<Record<string, object | undefined>, RouteNames.Onboarding>;

export default function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(_, index) => `slide-${index}`}
      />
      <View style={styles.footer}>
        <View style={styles.indicatorRow}>
          {slides.map((_, index) => (
            <View key={`dot-${index}`} style={[styles.dot, activeIndex === index && styles.activeDot]} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteNames.Login)}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width: Dimensions.get('window').width,
    padding: 32,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.primaryDark,
    ...TYPOGRAPHY.heading,
    marginBottom: 16,
  },
  description: {
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.body,
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 16,
  },
});
