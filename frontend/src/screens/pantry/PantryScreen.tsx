import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { mockIngredients } from '../../mocks/recipes';
import { useAppStore } from '../../store/useAppStore';
import { fetchPantryItems, addPantryItemBackend, deletePantryItemBackend } from '../../services/api/pantry';

export default function PantryScreen() {
  const user = useAppStore((state) => state.user);
  const pantry = useAppStore((state) => state.pantry);
  const addPantryItem = useAppStore((state) => state.addPantryItem);
  const removePantryItem = useAppStore((state) => state.removePantryItem);
  
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [customIngredient, setCustomIngredient] = useState('');

  const handleCustomAdd = async () => {
    if (!customIngredient.trim()) return;
    const name = customIngredient.trim();
    setActionLoading('custom-add');
    try {
      const addedItem = await addPantryItemBackend(name);
      addPantryItem({
        id: addedItem.id,
        name: addedItem.ingrediente,
        category: 'General',
      });
      setCustomIngredient('');
    } catch (error) {
      alert('No se pudo agregar el ingrediente personalizado');
    } finally {
      setActionLoading(null);
    }
  };

  // Cargar ingredientes reales desde la Base de Datos al abrir la pantalla
  useEffect(() => {
    const loadPantry = async () => {
      setLoading(true);
      try {
        const items = await fetchPantryItems();
        // Sincronizar el useAppStore local
        items.forEach((item: any) => {
          addPantryItem({
            id: item.id,
            name: item.ingrediente,
            category: 'General',
          });
        });
      } catch (error) {
        console.error('Error al cargar despensa:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPantry();
  }, []);

  const handleAdd = async (ingredientName: string, mockId: string) => {
    setActionLoading(mockId);
    try {
      const addedItem = await addPantryItemBackend(ingredientName);
      // Agregar al estado global usando el ID real retornado por el Backend
      addPantryItem({
        id: addedItem.id,
        name: addedItem.ingrediente,
        category: 'General',
      });
    } catch (error) {
      alert('No se pudo agregar el ingrediente al servidor');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (mockId: string) => {
    setActionLoading(mockId);
    // Buscar en nuestra despensa local el item para saber su ID real de base de datos
    const dbItem = pantry.find((i) => i.id === mockId || i.name === mockIngredients.find(m => m.id === mockId)?.name);
    if (!dbItem) {
      setActionLoading(null);
      return;
    }

    try {
      await deletePantryItemBackend(dbItem.id);
      removePantryItem(dbItem.id);
    } catch (error) {
      alert('No se pudo eliminar el ingrediente del servidor');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Despensa</Text>
        <Text style={styles.subtitle}>Añade o elimina ingredientes para personalizar tus recetas.</Text>
        
        {loading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginBottom: 16 }} />}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Añadir ingrediente personalizado..."
            placeholderTextColor={COLORS.textSecondary}
            value={customIngredient}
            onChangeText={setCustomIngredient}
            style={styles.customInput}
          />
          <Button 
            title="+" 
            onPress={handleCustomAdd} 
            disabled={actionLoading !== null || !customIngredient.trim()} 
            style={styles.addBtn}
          />
        </View>

        <Text style={styles.sectionHeader}>Ingredientes sugeridos</Text>
        <View style={{ maxHeight: 280 }}>
          <FlatList
            data={mockIngredients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isAdded = pantry.some((i) => i.name.toLowerCase() === item.name.toLowerCase());
              const localItem = pantry.find((i) => i.name.toLowerCase() === item.name.toLowerCase());

              return (
                <View style={styles.row}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {isAdded ? (
                    <Button 
                      title={actionLoading === (localItem?.id || item.id) ? "Quitando..." : "Quitar"} 
                      onPress={() => handleRemove(localItem?.id || item.id)} 
                      variant="secondary" 
                      style={styles.smallButton}
                      disabled={actionLoading !== null}
                    />
                  ) : (
                    <Button 
                      title={actionLoading === item.id ? "Añadiendo..." : "Añadir"} 
                      onPress={() => handleAdd(item.name, item.id)} 
                      style={styles.smallButton}
                      disabled={actionLoading !== null}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>

        <Text style={styles.sectionHeader}>Mi Despensa Real ({pantry.length})</Text>
        <FlatList 
          data={pantry} 
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <View style={styles.pantryRow}>
              <Text style={styles.pantryItem}>• {item.name}</Text>
              <Text 
                style={styles.deleteLink} 
                onPress={() => actionLoading === null && handleRemove(item.id)}
              >
                Eliminar
              </Text>
            </View>
          )}
        />
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
  pantryItem: { ...TYPOGRAPHY.body, color: COLORS.textPrimary, fontSize: 16 },
  inputContainer: { flexDirection: 'row', marginBottom: 16 },
  customInput: { flex: 1, height: 46, borderSize: 1, borderColor: COLORS.border, borderWidth: 1, backgroundColor: COLORS.surface, borderRadius: 12, paddingHorizontal: 12, marginRight: 8, color: COLORS.textPrimary },
  addBtn: { minWidth: 46, height: 46, justifyContent: 'center', alignItems: 'center' },
  sectionHeader: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.textPrimary, marginTop: 16, marginBottom: 8 },
  pantryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  deleteLink: { color: 'red', fontWeight: '600', paddingHorizontal: 8 }
});
