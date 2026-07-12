import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import type { Recipe } from '../../types';

type Props = {
  recipe: Recipe;
  onPress: () => void;
  isIncompatible?: boolean;
};

export default function RecipeCard({ recipe, onPress, isIncompatible = false }: Props) {
  // Unsplash cambió su API de source.unsplash.com a images.unsplash.com.
  // Si viene con el formato anterior, la convertimos a un término de búsqueda en images.unsplash o usamos un placeholder por defecto.
  const imageUrl = recipe.image && !recipe.image.includes('source.unsplash.com') 
    ? recipe.image 
    : 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {isIncompatible ? <View style={styles.badge}><Text style={styles.badgeText}>Incompatible</Text></View> : null}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.meta}>{recipe.category} • {recipe.time} min • {recipe.calories} kcal</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 20, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  image: { width: '100%', height: 140 },
  badge: { position: 'absolute', top: 10, right: 10, backgroundColor: COLORS.error, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { color: COLORS.surface, fontSize: 12, fontWeight: '600' },
  content: { padding: 12 },
  title: { ...TYPOGRAPHY.subtitle, fontSize: 18, color: COLORS.textPrimary },
  meta: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: 4 },
});
