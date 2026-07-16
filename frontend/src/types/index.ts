export type Ingredient = {
  id: string;
  name: string;
  category: string;
  icon?: string;
};

export type Recipe = {
  id: string;
  title: string;
  category: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack';
  time: number;
  calories: number;
  ingredients: string[];
  steps: string[];
  allergens: string[];
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
  };
  image: string;
};

export type Market = {
  id: string;
  name: string;
  address: string;
  coords: { latitude: number; longitude: number };
};

export type UserProfile = {
  name: string;
  email: string;
  allergies: string[];
  preferences: string[];
  restrictions: string[];
};

export type AppState = {
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  user: UserProfile | null;
  pantry: Ingredient[];
  favorites: any[];
  token: string | null;
  isHydrated: boolean;
};
