import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getRecipes } from '@services/recipesService';
import RecipeCard from '@components/features/RecipeCard';
import SectionTitle from '@components/ui/SectionTitle';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@constants/routes';
import { COLORS } from '@constants/colors';
import { Recipe } from '@types';

export default function RecipesListScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function load() {
      const response = await getRecipes();
      setRecipes(response);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <SectionTitle title="Recetas" subtitle="Filtra por tiempo, calorías y categoría." />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate(RouteNames.RecipeDetail, { recipeId: item.id })}
              incompatible={item.allergens.length > 0}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  list: {
    paddingBottom: 24,
  },
});
