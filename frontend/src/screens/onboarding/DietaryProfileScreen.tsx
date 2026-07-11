import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

export default function DietaryProfileScreen({ navigation }: any) {
  const setOnboardingComplete = useAppStore((state) => state.setOnboardingComplete);
  const [allergies, setAllergies] = useState<string[]>(['Lácteos']);

  const toggle = (item: string) => {
    setAllergies((current) => current.includes(item) ? current.filter((i) => i !== item) : [...current, item]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tu perfil alimentario</Text>
        <Text style={styles.subtitle}>Ajusta tus preferencias para recibir recetas más útiles.</Text>
        {['Lácteos', 'Pescado', 'Gluten', 'Frutos secos'].map((item) => (
          <Button key={item} title={allergies.includes(item) ? `✓ ${item}` : item} onPress={() => toggle(item)} variant={allergies.includes(item) ? 'primary' : 'secondary'} style={styles.option} />
        ))}
        <Button title="Guardar perfil" onPress={() => {
          setOnboardingComplete();
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { ...TYPOGRAPHY.title, color: COLORS.textPrimary },
  subtitle: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 8, marginBottom: 20 },
  option: { marginBottom: 10 },
});
