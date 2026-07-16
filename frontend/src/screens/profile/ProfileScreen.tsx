import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

import { FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { fetchFavoriteRecipesBackend, deleteFavoriteRecipeBackend } from '../../services/api/recipes';

export default function ProfileScreen({ navigation }: any) {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const favorites = useAppStore((state) => state.favorites) || [];
  const setFavorites = useAppStore((state) => state.setFavorites);
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
    // Recargar favoritos únicamente cuando la pantalla tome foco (evita doble petición al montar)
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDeleteFavorite = async (recipeId: string) => {
    const previousFavorites = [...favorites];
    
    // Actualización optimista: quitamos el favorito localmente para respuesta instantánea (0ms)
    setFavorites(favorites.filter((item: any) => item.id !== recipeId));
    
    try {
      await deleteFavoriteRecipeBackend(recipeId);
      Alert.alert('Eliminado', 'Receta removida de tus favoritos.');
    } catch (error) {
      // Si el borrado falla en la API, restauramos el estado anterior
      setFavorites(previousFavorites);
      Alert.alert('Error', 'No se pudo eliminar la receta del servidor.');
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
        {loading && favorites.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : (
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
        )}

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
