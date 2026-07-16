import React from 'react';

// Mapeo de imágenes locales para cada categoría
// NOTA: Puedes reemplazar estos placeholders por imágenes físicas arrastrándolas
// a tu carpeta de assets y usando require('./path/to/image.png')
export const getRecipeImage = (category: string, recipeImageUri?: string): any => {
  // Limpiamos la categoría
  const cat = (category || '').trim().toLowerCase();

  // Mapeamos las imágenes locales en assets/resources/ de manera offline
  switch(cat) {
    case 'desayuno':
      return require('../../../assets/resources/desayuno.png');
    case 'almuerzo':
      return require('../../../assets/resources/almuerzo.png');
    case 'cena':
      return require('../../../assets/resources/cena.png');
    case 'snack':
      return require('../../../assets/resources/snack.png');
    default:
      // Si tiene una URL de imagen remota válida en images.unsplash, podemos usarla
      if (recipeImageUri && recipeImageUri.includes('images.unsplash.com')) {
        return { uri: recipeImageUri };
      }
      return require('../../../assets/resources/default.png');
  }
};
