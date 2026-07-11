import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { Recipe } from '@types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  incompatible?: boolean;
}

export default function RecipeCard({ recipe, onPress, incompatible }: RecipeCardProps) {
  return (
    <TouchableOpacity style={[styles.card, incompatible && styles.incompatible]} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.row}>
          <Text style={styles.meta}>{recipe.timeMinutes} min</Text>
          <Text style={styles.meta}>{recipe.calories} kcal</Text>
        </View>
        <View style={styles.badges}>
          {recipe.allergens.length > 0 && (
            <View style={styles.allergenBadge}>
              <Text style={styles.allergenText}>Alergias</Text>
            </View>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{recipe.category}</Text>
          </View>
        </View>
      </View>
      {incompatible ? <View style={styles.overlay}><Text style={styles.overlayText}>Incompatible</Text></View> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
  },
  incompatible: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergenBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryBadge: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  allergenText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  categoryText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(230, 57, 70, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  overlayText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 12,
  },
});
