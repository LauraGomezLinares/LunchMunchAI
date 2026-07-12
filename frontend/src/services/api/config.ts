// Configuración de la API del Backend usando variables de entorno de Expo (saca el valor de .env).
// Soporta tanto IPs locales (ej: http://192.168.X.X:8000) como URLs públicas de túneles como Ngrok (ej: https://xxxx.ngrok-free.app).
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.18.177:8000';


