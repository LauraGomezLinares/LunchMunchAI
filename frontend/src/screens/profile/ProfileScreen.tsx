import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen({ navigation }: any) {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.label}>Nombre: {user?.name ?? 'Sin nombre'}</Text>
        <Text style={styles.label}>Correo: {user?.email ?? 'Sin correo'}</Text>
        <Text style={styles.label}>Alergias: {user?.allergies.join(', ') || 'Ninguna'}</Text>
        <Button title="Cerrar sesión" onPress={() => { logout(); }} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  label: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 8 },
  button: { marginTop: 20 },
});
