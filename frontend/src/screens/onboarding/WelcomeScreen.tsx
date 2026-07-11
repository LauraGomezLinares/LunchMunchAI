import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

export default function WelcomeScreen({ navigation }: any) {
  const setOnboardingComplete = useAppStore((state) => state.setOnboardingComplete);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>LunchMunchAI</Text>
          <Text style={styles.subtitle}>Tu asistente de alimentación inteligente para días cargados.</Text>
          <Button title="Comenzar" onPress={() => { setOnboardingComplete(); navigation.navigate('DietaryProfile'); }} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { ...TYPOGRAPHY.title, color: COLORS.surface, fontSize: 36 },
  subtitle: { ...TYPOGRAPHY.body, color: COLORS.surface, marginTop: 12, marginBottom: 24, lineHeight: 24 },
});
