import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';
import { useAuthStore } from '@store/authStore';
import { getSuggestedRecipe } from '@services/recipesService';
import RecipeCard from '@components/features/RecipeCard';
import SectionTitle from '@components/ui/SectionTitle';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@constants/routes';
import { Recipe } from '@types';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendation() {
      const suggested = await getSuggestedRecipe();
      setRecipe(suggested);
      setLoading(false);
    }
    loadRecommendation();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SectionTitle title={`Hola, ${user?.name ?? 'amigo'}`} subtitle="Te ayudamos a comer mejor con lo que tienes." />

      <View style={styles.dashboardCard}>
        <Text style={styles.cardTitle}>Despensa</Text>
        <Text style={styles.cardText}>Revisa tu inventario y actualiza los ingredientes disponibles.</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>Receta sugerida del día</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : recipe ? (
        <RecipeCard
          recipe={recipe}
          onPress={() => navigation.navigate(RouteNames.RecipeDetail, { recipeId: recipe.id })}
        />
      ) : (
        <Text style={styles.placeholder}>No hay recomendaciones disponibles.</Text>
      )}
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
  },
  dashboardCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.subtitle,
    marginBottom: 8,
  },
  cardText: {
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.body,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  placeholder: {
    color: COLORS.textSecondary,
  },
});
