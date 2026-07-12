import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';
import { useAppStore } from '../../store/useAppStore';

export const mockLogin = async (email: string, password: string) => {
  console.log(`[API Request] POST ${BASE_URL}/auth/login | Body:`, { email, password });
  
  try {
    // Nota: El backend en routers/auth.py tiene un endpoint provisional "/auth/login".
    // Enviamos una petición POST a dicho endpoint.
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(`[API Response] POST ${BASE_URL}/auth/login | Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Credenciales inválidas');
    }

    const data = await response.json();
    console.log(`[API Response Data]`, data);

    // Si tuviéramos JWT dinámicos o datos reales, mapeamos el perfil aquí.
    // Como el endpoint provisional devuelve un mensaje fijo de auth delegado a Azure Entra ID B2C,
    // usamos una simulación local con el correo/nombre si es exitoso para desarrollo.
    const token = data.token || 'fake-jwt-token';
    const userProfile = {
      name: email.split('@')[0],
      email: email,
      allergies: ['Lácteos'],
      preferences: ['Saludable'],
      restrictions: ['Sin gluten'],
    };

    // Actualizamos el almacén global
    useAppStore.getState().login(userProfile, token);

    await AsyncStorage.setItem('mock-token', token).catch(() => undefined);
    return { token, user: userProfile };
  } catch (error: any) {
    console.error(`[API Error] POST ${BASE_URL}/auth/login | Error:`, error.message);
    throw error;
  }
};

export const registerUser = async (nombre: string, email: string, password: string) => {
  console.log(`[API Request] POST ${BASE_URL}/auth/register | Body:`, { nombre, email, password });
  
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
        alergias: [],
        objetivos_nutricionales: ""
      }),
    });

    console.log(`[API Response] POST ${BASE_URL}/auth/register | Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error al registrar el usuario');
    }

    const data = await response.json();
    console.log(`[API Response Data]`, data);

    const token = data.usuario_id;
    const userProfile = {
      name: nombre,
      email: email,
      allergies: data.perfil?.alergias || [],
      preferences: [],
      restrictions: []
    };

    useAppStore.getState().login(userProfile, token);
    await AsyncStorage.setItem('mock-token', token).catch(() => undefined);
    return { token, user: userProfile };
  } catch (error: any) {
    console.error(`[API Error] POST ${BASE_URL}/auth/register | Error:`, error.message);
    throw error;
  }
};
