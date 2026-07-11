import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { usePantryStore } from '@store/pantryStore';
import PrimaryButton from '@components/ui/PrimaryButton';
import PantryItemCard from '@components/features/PantryItemCard';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';
import SectionTitle from '@components/ui/SectionTitle';

export default function PantryScreen() {
  const { items, initialize, removeItem } = usePantryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await initialize();
      setLoading(false);
    }
    load();
  }, [initialize]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SectionTitle title="Despensa" subtitle="Gestiona los ingredientes que tienes en casa." />
      {loading ? (
        <Text style={styles.placeholder}>Cargando despensa...</Text>
      ) : (
        items.map((item) => (
          <PantryItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />
        ))
      )}
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Agregar ingrediente</Text>
        <Text style={styles.helpText}>Placeholder para formulario de nueva despensa. Aquí se integrará la lógica futura de creación.</Text>
      </View>
      <PrimaryButton title="Agregar ingrediente" onPress={() => Alert.alert('Funcionalidad en construcción', 'Aquí se agregará la lógica de añadir ingredientes.')} />
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
  placeholder: {
    color: COLORS.textSecondary,
  },
  helpBox: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  helpTitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  helpText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
