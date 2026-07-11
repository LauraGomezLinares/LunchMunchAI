import { RouteNames } from '../constants/routes';

export type RootStackParamList = {
  [RouteNames.Splash]: undefined;
  [RouteNames.Onboarding]: undefined;
  [RouteNames.Login]: undefined;
  [RouteNames.Register]: undefined;
  [RouteNames.DietaryProfile]: undefined;
  [RouteNames.Home]: undefined;
  [RouteNames.Pantry]: undefined;
  [RouteNames.Recipes]: undefined;
  [RouteNames.RecipeDetail]: { recipeId: string };
  [RouteNames.Markets]: undefined;
  [RouteNames.Profile]: undefined;
};

export type MainTabParamList = {
  [RouteNames.Home]: undefined;
  [RouteNames.Pantry]: undefined;
  [RouteNames.Recipes]: undefined;
  [RouteNames.Markets]: undefined;
  [RouteNames.Profile]: undefined;
};
