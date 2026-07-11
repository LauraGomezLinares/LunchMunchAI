import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getNearbyMarkets } from '@services/marketsService';
import { Market } from '@types';
import { COLORS } from '@constants/colors';
import SectionTitle from '@components/ui/SectionTitle';

const USER_LOCATION = {
  latitude: -12.0464,
  longitude: -77.0428,
};

export default function NearbyMarketsScreen() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await getNearbyMarkets();
      setMarkets(response);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <SectionTitle title="Mercados cercanos" subtitle="Ubicaciones estáticas en Lima Metropolitana." />
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Mapa simulado de Lima</Text>
        <Text style={styles.mapText}>Lat: {USER_LOCATION.latitude}</Text>
        <Text style={styles.mapText}>Lng: {USER_LOCATION.longitude}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={markets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.marketCard}>
              <Text style={styles.marketName}>{item.name}</Text>
              <Text style={styles.marketAddress}>{item.address}</Text>
              <Text style={styles.marketDistance}>{item.distance}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
  },
  mapText: {
    color: COLORS.textSecondary,
  },
  marketCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  marketName: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  marketAddress: {
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  marketDistance: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 24,
  },
});
