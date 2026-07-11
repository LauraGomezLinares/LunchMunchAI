import AsyncStorage from '@react-native-async-storage/async-storage';

export const mockLogin = async (email: string, password: string) => {
  // TODO: conectar a FastAPI endpoint /auth/login
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@lunchmunch.ai' && password === '123456') {
        AsyncStorage.setItem('mock-token', 'fake-token').catch(() => undefined);
        resolve({ token: 'fake-token', user: { name: 'Ana', email, allergies: ['Lácteos'], preferences: ['Saludable'], restrictions: ['Sin gluten'] } });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 800);
  });
};
