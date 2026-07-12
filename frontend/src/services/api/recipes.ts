import { BASE_URL } from './config';
import { useAppStore } from '../../store/useAppStore';

export const getRecipes = async () => {
  const token = useAppStore.getState().token;
  console.log(`[API Request] GET ${BASE_URL}/recipes/recommend | Token: ${token ? 'Present' : 'None'}`);

  try {
    const response = await fetch(`${BASE_URL}/recipes/recommend`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    console.log(`[API Response] GET ${BASE_URL}/recipes/recommend | Status: ${response.status}`);

    if (!response.ok) {
      throw new Error('Error al obtener las recetas recomendadas');
    }

    const data = await response.json();
    console.log(`[API Response Data]`, data);
    return data;
  } catch (error: any) {
    console.error(`[API Error] GET ${BASE_URL}/recipes/recommend | Error:`, error.message);
    throw error;
  }
};

export const fetchFavoriteRecipesBackend = async () => {
  const token = useAppStore.getState().token;
  console.log(`[API Request] GET ${BASE_URL}/recipes/favorites | Token: ${token ? 'Present' : 'None'}`);

  try {
    const response = await fetch(`${BASE_URL}/recipes/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    console.log(`[API Response] GET ${BASE_URL}/recipes/favorites | Status: ${response.status}`);

    if (!response.ok) {
      throw new Error('Error al obtener el historial de favoritos');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`[API Error] GET ${BASE_URL}/recipes/favorites | Error:`, error.message);
    throw error;
  }
};

export const addFavoriteRecipeBackend = async (recipe: any) => {
  const token = useAppStore.getState().token;
  console.log(`[API Request] POST ${BASE_URL}/recipes/favorites | Token: ${token ? 'Present' : 'None'}`);

  try {
    const response = await fetch(`${BASE_URL}/recipes/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(recipe),
    });

    console.log(`[API Response] POST ${BASE_URL}/recipes/favorites | Status: ${response.status}`);

    if (!response.ok) {
      throw new Error('Error al guardar la receta en favoritos');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`[API Error] POST ${BASE_URL}/recipes/favorites | Error:`, error.message);
    throw error;
  }
};

export const deleteFavoriteRecipeBackend = async (recipeId: string) => {
  const token = useAppStore.getState().token;
  console.log(`[API Request] DELETE ${BASE_URL}/recipes/favorites/${recipeId} | Token: ${token ? 'Present' : 'None'}`);

  try {
    const response = await fetch(`${BASE_URL}/recipes/favorites/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    console.log(`[API Response] DELETE ${BASE_URL}/recipes/favorites/${recipeId} | Status: ${response.status}`);

    if (!response.ok) {
      throw new Error('Error al eliminar la receta de favoritos');
    }

    return await response.json();
  } catch (error: any) {
    console.error(`[API Error] DELETE ${BASE_URL}/recipes/favorites/${recipeId} | Error:`, error.message);
    throw error;
  }
};
