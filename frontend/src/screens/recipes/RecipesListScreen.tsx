import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '../../components/features/RecipeCard';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import type { Recipe } from '../../types';
import Button from '../../components/ui/Button';
import { getRecipes } from '../../services/api/recipes';
import { useAppStore } from '../../store/useAppStore';

export default function RecipesListScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAppStore((state) => state.user);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await getRecipes() as Recipe[];
      setRecipes(data);
    } catch (error: any) {
      const msg = error.message || 'Ocurrió un error inesperado al conectar con el servidor.';
      alert(`Error al generar recetas: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ya no llamamos automáticamente a handleGenerate() al entrar a la pantalla para evitar
    // consumo automático e innecesario de la API de Azure OpenAI / créditos.
    // El usuario decidirá cuándo presionar el botón "Generar IA".
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Recetas</Text>
            <Text style={styles.subtitle}>Filtra por tiempo, calorías y categoría.</Text>
          </View>
          <Button 
            title={loading ? "Procesando..." : "Generar IA"} 
            onPress={handleGenerate}
            disabled={loading}
            style={styles.generateButton}
          />
        </View>

        {loading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 24 }} />}
        {!loading && recipes.map((recipe) => (
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  generateButton: { minWidth: 100, minHeight: 40, paddingVertical: 8, paddingHorizontal: 12 }
});
