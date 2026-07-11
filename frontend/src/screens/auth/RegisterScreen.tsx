import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAppStore((state) => state.login);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Completa tus datos');
      return;
    }
    login({ name, email, allergies: [], preferences: [], restrictions: [] }, 'fake-token');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nombre" />
        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Correo" autoCapitalize="none" />
        <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Contraseña" secureTextEntry />
        <Button title="Registrarme" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 12 },
});
