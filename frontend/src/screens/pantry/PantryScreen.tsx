import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { mockIngredients } from '../../mocks/recipes';
import { useAppStore } from '../../store/useAppStore';

export default function PantryScreen() {
  const pantry = useAppStore((state) => state.pantry);
  const addPantryItem = useAppStore((state) => state.addPantryItem);
  const removePantryItem = useAppStore((state) => state.removePantryItem);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Despensa</Text>
        <Text style={styles.subtitle}>Añade o elimina ingredientes para personalizar tus recetas.</Text>
        {mockIngredients.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.itemName}>{item.name}</Text>
            {pantry.some((i) => i.id === item.id) ? (
              <Button title="Quitar" onPress={() => removePantryItem(item.id)} variant="secondary" style={styles.smallButton} />
            ) : (
              <Button title="Añadir" onPress={() => addPantryItem(item)} style={styles.smallButton} />
            )}
          </View>
        ))}
        <FlatList data={pantry} keyExtractor={(item) => item.id} renderItem={({ item }) => <Text style={styles.pantryItem}>• {item.name}</Text>} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16 },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  subtitle: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 6, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 12, borderRadius: 14, marginBottom: 8 },
  itemName: { ...TYPOGRAPHY.body, color: COLORS.textPrimary },
  smallButton: { minHeight: 36, paddingVertical: 6, paddingHorizontal: 12 },
  pantryItem: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 6 },
});
