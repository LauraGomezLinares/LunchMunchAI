import { mockRecipes } from '../../mocks/recipes';

export const getRecipes = async () => {
  // TODO: conectar a FastAPI endpoint /recipes/recommend
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecipes), 500);
  });
};
