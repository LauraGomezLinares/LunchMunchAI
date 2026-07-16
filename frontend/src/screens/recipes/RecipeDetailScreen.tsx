import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

import { Alert, Image } from 'react-native';
import { addFavoriteRecipeBackend } from '../../services/api/recipes';
import { getRecipeImage } from '../../components/features/RecipeImageHelper';

export default function RecipeDetailScreen({ route }: any) {
  const recipe = route.params?.recipe;
  const [saving, setSaving] = React.useState(false);

  if (!recipe) return null;

  const imageSource = getRecipeImage(recipe.category, recipe.image);

  const handleSaveFavorite = async () => {
    setSaving(true);
    try {
      await addFavoriteRecipeBackend({
        title: recipe.title,
        category: recipe.category,
        time: recipe.time,
        calories: recipe.calories,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        allergens: recipe.allergens || [],
        nutrition: recipe.nutrition,
        image: recipe.image
      });
      Alert.alert('Éxito', 'Receta guardada en tus favoritos correctamente.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la receta en favoritos');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={imageSource} style={styles.detailImage} />
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.meta}>{recipe.category} • {recipe.time} min • {recipe.calories} kcal</Text>
        
        <Button 
          title={saving ? "Guardando..." : "Guardar en Favoritos 💛"} 
          onPress={handleSaveFavorite} 
          disabled={saving}
          style={{ marginBottom: 12 }}
        />

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {recipe.ingredients.map((item: string) => <Text key={item} style={styles.item}>• {item}</Text>)}
        <Text style={styles.sectionTitle}>Pasos</Text>
        {recipe.steps.map((step: string, index: number) => <Text key={step} style={styles.item}>{index + 1}. {step}</Text>)}
        <Text style={styles.sectionTitle}>Información nutricional</Text>
        <Text style={styles.item}>Proteína: {recipe.nutrition.protein}g</Text>
        <Text style={styles.item}>Carbohidratos: {recipe.nutrition.carbs}g</Text>
        <Text style={styles.item}>Grasas: {recipe.nutrition.fat}g</Text>
        <Button title="Ingredientes faltantes" onPress={() => undefined} style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  detailImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 16 },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  meta: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 8, marginBottom: 12 },
  sectionTitle: { ...TYPOGRAPHY.subtitle, color: COLORS.textPrimary, marginTop: 12, marginBottom: 8 },
  item: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 6 },
  button: { marginTop: 16 },
});
