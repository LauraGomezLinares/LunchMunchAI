import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';
import { PantryItem } from '@types';
import { Ionicons } from '@expo/vector-icons';

interface PantryItemCardProps {
  item: PantryItem;
  onRemove: () => void;
}

export default function PantryItemCard({ item, onRemove }: PantryItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>{item.category} • {item.quantity}</Text>
        <Text style={styles.freshness}>Frescura: {item.freshness}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onRemove} accessibilityLabel={`Eliminar ${item.name}`}>
        <Ionicons name="trash-bin-outline" size={22} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
  name: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  detail: {
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  freshness: {
    color: COLORS.textMuted,
  },
  button: {
    marginLeft: 12,
    padding: 8,
  },
});
