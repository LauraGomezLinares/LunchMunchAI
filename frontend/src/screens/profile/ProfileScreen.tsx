import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

import { FlatList, TouchableOpacity, Alert } from 'react-native';
import { fetchFavoriteRecipesBackend, deleteFavoriteRecipeBackend } from '../../services/api/recipes';

export default function ProfileScreen({ navigation }: any) {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const [favorites, setFavorites] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await fetchFavoriteRecipesBackend();
      setFavorites(data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadFavorites();
    // Recargar favoritos cuando la pantalla toma foco
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDeleteFavorite = async (recipeId: string) => {
    try {
      await deleteFavoriteRecipeBackend(recipeId);
      setFavorites((prev) => prev.filter((item) => item.id !== recipeId));
      Alert.alert('Eliminado', 'Receta removida de tus favoritos.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la receta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.label}>Nombre: {user?.name ?? 'Sin nombre'}</Text>
        <Text style={styles.label}>Correo: {user?.email ?? 'Sin correo'}</Text>
        <Text style={styles.label}>Alergias: {user?.allergies.join(', ') || 'Ninguna'}</Text>
        
        <Text style={styles.subtitle}>Mis Recetas Guardadas ({favorites.length})</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.favRow}>
              <TouchableOpacity 
                style={{ flex: 1 }}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
              >
                <Text style={styles.favTitle}>{item.title}</Text>
                <Text style={styles.favMeta}>{item.category} • {item.time} min</Text>
              </TouchableOpacity>
              <Text style={styles.deleteLink} onPress={() => handleDeleteFavorite(item.id)}>Eliminar</Text>
            </View>
          )}
          style={{ marginTop: 12, maxHeight: 300 }}
        />

        <Button title="Cerrar sesión" onPress={() => { logout(); }} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16 },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary, marginBottom: 12 },
  label: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 4 },
  subtitle: { ...TYPOGRAPHY.subtitle, color: COLORS.textPrimary, marginTop: 24, marginBottom: 8 },
  favRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 12, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  favTitle: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.textPrimary },
  favMeta: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: 4 },
  deleteLink: { color: 'red', fontWeight: '600', paddingHorizontal: 8 },
  button: { marginTop: 24 },
});
