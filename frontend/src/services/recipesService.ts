import { Recipe } from '../types';
import { mockedRecipes } from '../mocks/recipes';

const WAIT_TIME = 700;

export async function getRecipes(): Promise<Recipe[]> {
  // TODO: conectar a FastAPI endpoint /recipes/list
  return new Promise((resolve) => setTimeout(() => resolve(mockedRecipes), WAIT_TIME));
}

export async function getRecipeById(recipeId: string): Promise<Recipe | undefined> {
  // TODO: conectar a FastAPI endpoint /recipes/{id}
  return new Promise((resolve) => setTimeout(() => resolve(mockedRecipes.find((item) => item.id === recipeId)), WAIT_TIME));
}

export async function getSuggestedRecipe(): Promise<Recipe> {
  // TODO: conectar a FastAPI endpoint /recipes/recommend
  return new Promise((resolve) => setTimeout(() => resolve(mockedRecipes[0]), WAIT_TIME));
}
