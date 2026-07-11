import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';
import { mockLogin } from '../../services/api/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('demo@lunchmunch.ai');
  const [password, setPassword] = useState('123456');
  const login = useAppStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const response = await mockLogin(email, password) as { token: string; user: any };
      login(response.user, response.token);
    } catch (error) {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inicia sesión</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Correo" autoCapitalize="none" />
        <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Contraseña" secureTextEntry />
        <Button title="Entrar" onPress={handleLogin} />
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Crear cuenta</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 12 },
  link: { color: COLORS.primary, textAlign: 'center', marginTop: 16, fontWeight: '600' },
});
