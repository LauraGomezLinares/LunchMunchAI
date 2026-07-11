import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getRecipeById } from '@services/recipesService';
import { Recipe } from '@types';
import SectionTitle from '@components/ui/SectionTitle';
import { COLORS } from '@constants/colors';
import { RouteNames } from '@constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RecipeDetailParams = {
  [RouteNames.RecipeDetail]: { recipeId: string };
};

type Props = NativeStackScreenProps<RecipeDetailParams, RouteNames.RecipeDetail>;

export default function RecipeDetailScreen({ route }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const recipeId = route.params?.recipeId ?? '';

  useEffect(() => {
    async function load() {
      if (!recipeId) return;
      const response = await getRecipeById(recipeId);
      setRecipe(response ?? null);
      setLoading(false);
    }
    load();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.placeholder}>Receta no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SectionTitle title={recipe.title} subtitle={recipe.category} />
      <View style={styles.detailsRow}>
        <Text style={styles.meta}>{recipe.timeMinutes} min</Text>
        <Text style={styles.meta}>{recipe.calories} kcal</Text>
        <Text style={styles.meta}>{recipe.difficulty}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Ingredientes</Text>
        {recipe.ingredients.map((ingredient: string) => (
          <Text key={ingredient} style={styles.listItem}>• {ingredient}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Preparación</Text>
        {recipe.steps.map((step: string, index: number) => (
          <Text key={`${step}-${index}`} style={styles.listItem}>{index + 1}. {step}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Información nutricional</Text>
        <Text style={styles.listItem}>Proteínas: {recipe.nutrition.protein} g</Text>
        <Text style={styles.listItem}>Carbohidratos: {recipe.nutrition.carbs} g</Text>
        <Text style={styles.listItem}>Grasas: {recipe.nutrition.fat} g</Text>
      </View>
      <TouchableOpacity style={styles.missingButton} onPress={() => Alert.alert('Ingredientes faltantes', 'Aquí se mostrará qué ingredientes te faltan.') }>
        <Text style={styles.missingText}>Revisar ingredientes faltantes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  meta: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  listItem: {
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 22,
  },
  missingButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
  missingText: {
    color: COLORS.surface,
    fontWeight: '700',
  },
});
