export type DietaryPreference = 'vegetarian' | 'vegan' | 'omnivore' | 'low_carb' | 'high_protein';

export type Allergen = 'gluten' | 'dairy' | 'nuts' | 'soy' | 'seafood' | 'eggs';

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  location: string;
  preferences: DietaryPreference[];
  allergens: Allergen[];
}

export interface AuthUser extends UserProfile {
  id: string;
  password: string;
  token: string;
  onboardCompleted: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  image: string;
  calories: number;
  timeMinutes: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  tags: string[];
  allergens: Allergen[];
  ingredients: string[];
  steps: string[];
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  freshness: 'Alta' | 'Media' | 'Baja';
  icon: string;
}

export interface Market {
  id: string;
  name: string;
  address: string;
  distance: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}
