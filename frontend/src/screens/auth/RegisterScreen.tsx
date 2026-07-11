import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@components/ui/PrimaryButton';
import { useAuthStore } from '@store/authStore';
import { RouteNames } from '@constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DietaryPreference } from '@types';
import { COLORS } from '@constants/colors';
import { TYPOGRAPHY } from '@constants/typography';

const registerSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type RegisterForm = z.infer<typeof registerSchema>;
type Props = NativeStackScreenProps<Record<string, object | undefined>, RouteNames.Register>;

export default function RegisterScreen({ navigation }: Props) {
  const register = useAuthStore((state) => state.register);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  async function onSubmit(values: RegisterForm) {
    try {
      await register({
        name: values.name,
        email: values.email,
        age: 25,
        location: 'Lima Metropolitana',
        preferences: ['omnivore' as DietaryPreference],
        allergens: [],
        password: values.password,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario. Intenta nuevamente.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Regístrate para empezar a planificar comidas saludables.</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <TextInput style={[styles.input, errors.name && styles.inputError]} value={value} onChangeText={onChange} placeholder="Tu nombre" />
          )}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name.message}</Text> : null}

        <Text style={styles.label}>Correo electrónico</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email.message}</Text> : null}

        <Text style={styles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="********"
              secureTextEntry
            />
          )}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password.message}</Text> : null}

        <PrimaryButton title="Registrarse" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

        <TouchableOpacity onPress={() => navigation.navigate(RouteNames.Login)} style={styles.linkButton}>
          <Text style={styles.linkText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  heading: {
    ...TYPOGRAPHY.heading,
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  form: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: COLORS.textPrimary,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
