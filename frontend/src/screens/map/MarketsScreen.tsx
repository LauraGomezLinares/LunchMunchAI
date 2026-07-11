import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { mockMarkets } from '../../mocks/recipes';

export default function MarketsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mercados cercanos</Text>
        <Text style={styles.subtitle}>Vista simulada con coordenadas de Lima y Callao.</Text>
        {mockMarkets.map((market) => (
          <View key={market.id} style={styles.card}>
            <Text style={styles.marketName}>{market.name}</Text>
            <Text style={styles.marketText}>{market.address}</Text>
            <Text style={styles.marketText}>Lat: {market.coords.latitude} • Lon: {market.coords.longitude}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16 },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  subtitle: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 6, marginBottom: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  marketName: { ...TYPOGRAPHY.subtitle, color: COLORS.textPrimary },
  marketText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 4 },
});
