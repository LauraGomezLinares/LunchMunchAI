import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '@store/authStore';
import SectionTitle from '@components/ui/SectionTitle';
import { COLORS } from '@constants/colors';
import PrimaryButton from '@components/ui/PrimaryButton';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Perfil" subtitle="Administra tu cuenta y preferencias." />
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{user?.name ?? '-'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? '-'}</Text>

        <Text style={styles.label}>Ubicación</Text>
        <Text style={styles.value}>{user?.location ?? '-'}</Text>

        <Text style={styles.label}>Alergias</Text>
        <Text style={styles.value}>{user?.allergens.length ? user.allergens.join(', ') : 'Ninguna'}</Text>
      </View>
      <PrimaryButton title="Editar alergias" onPress={() => Alert.alert('Funcionalidad en construcción', 'Aquí se integrará el flujo de edición de alergias.')} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  value: {
    color: COLORS.textPrimary,
    marginBottom: 18,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: '700',
  },
});
