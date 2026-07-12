import { BASE_URL } from './config';
import { useAppStore } from '../../store/useAppStore';

// Header de seguridad básico para comunicarnos con el backend protegido
const getHeaders = () => {
  const token = useAppStore.getState().token;
  return {
    'Content-Type': 'application/json',
    'X-API-KEY': 'dev-key-lunchmunch-123', // Nuestro header de seguridad para el backend
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const fetchPantryItems = async () => {
  console.log(`[API Request] GET ${BASE_URL}/pantry/`);
  try {
    const response = await fetch(`${BASE_URL}/pantry/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    console.log(`[API Response] GET /pantry/ | Status: ${response.status}`);
    if (!response.ok) throw new Error('Error al obtener la despensa');
    const data = await response.json();
    console.log(`[API Response Data]`, data);
    return data;
  } catch (error: any) {
    console.error(`[API Error] GET /pantry/ |`, error.message);
    throw error;
  }
};

export const addPantryItemBackend = async (ingrediente: string, cantidad: number = 1.0, unidad: string = 'unidad') => {
  console.log(`[API Request] POST ${BASE_URL}/pantry/`);
  try {
    const response = await fetch(`${BASE_URL}/pantry/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        ingrediente,
        cantidad,
        unidad,
      }),
    });
    console.log(`[API Response] POST /pantry/ | Status: ${response.status}`);
    if (!response.ok) throw new Error('Error al agregar el ingrediente');
    const data = await response.json();
    console.log(`[API Response Data]`, data);
    return data;
  } catch (error: any) {
    console.error(`[API Error] POST /pantry/ |`, error.message);
    throw error;
  }
};

export const deletePantryItemBackend = async (itemId: string) => {
  console.log(`[API Request] DELETE ${BASE_URL}/pantry/${itemId}`);
  try {
    const response = await fetch(`${BASE_URL}/pantry/${itemId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    console.log(`[API Response] DELETE /pantry/${itemId} | Status: ${response.status}`);
    if (!response.ok) throw new Error('Error al eliminar el ingrediente');
    return true;
  } catch (error: any) {
    console.error(`[API Error] DELETE /pantry/${itemId} |`, error.message);
    throw error;
  }
};
