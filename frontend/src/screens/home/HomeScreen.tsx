import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import type { Recipe } from '../../types';
import { getRecipes } from '../../services/api/recipes';
import { useAppStore } from '../../store/useAppStore';

export default function HomeScreen({ navigation }: any) {
  const user = useAppStore((state) => state.user);
  const pantry = useAppStore((state) => state.pantry);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.hero}>
          <Text style={styles.heroTitle}>Hola, {user?.name ?? 'amigo'} 👋</Text>
          <Text style={styles.heroText}>Tienes {pantry.length} ingredientes en casa. Hoy te recomendamos una receta fresca.</Text>
        </LinearGradient>
        <Text style={styles.sectionTitle}>Receta sugerida</Text>
        {recipes[0] ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{recipes[0].title}</Text>
            <Text style={styles.cardText}>{recipes[0].category} • {recipes[0].time} min • {recipes[0].calories} kcal</Text>
            <Text style={styles.cardText}>Ingredientes: {recipes[0].ingredients.join(', ')}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  hero: { borderRadius: 24, padding: 20, marginBottom: 16 },
  heroTitle: { ...TYPOGRAPHY.title, color: COLORS.surface, fontSize: 24 },
  heroText: { ...TYPOGRAPHY.body, color: COLORS.surface, marginTop: 8, lineHeight: 22 },
  sectionTitle: { ...TYPOGRAPHY.subtitle, color: COLORS.textPrimary, marginBottom: 8 },
  card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  cardTitle: { ...TYPOGRAPHY.subtitle, color: COLORS.textPrimary },
  cardText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 6 },
});
