import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '../../components/features/RecipeCard';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import type { Recipe } from '../../types';
import { getRecipes } from '../../services/api/recipes';
import { useAppStore } from '../../store/useAppStore';

export default function RecipesListScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    const load = async () => {
      const data = await getRecipes() as Recipe[];
      setRecipes(data);
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Recetas</Text>
        <Text style={styles.subtitle}>Filtra por tiempo, calorías y categoría.</Text>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isIncompatible={user?.allergies.some((item) => recipe.allergens.includes(item))}
            onPress={() => navigation.navigate('RecipeDetail', { recipe })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  subtitle: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 6, marginBottom: 14 },
});
