import type { Recipe, Ingredient, Market } from '../types';

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Tomate', category: 'Verduras' },
  { id: '2', name: 'Aguacate', category: 'Verduras' },
  { id: '3', name: 'Tortilla de maíz', category: 'Granos' },
  { id: '4', name: 'Pollo', category: 'Proteínas' },
  { id: '5', name: 'Arroz', category: 'Granos' },
  { id: '6', name: 'Queso fresco', category: 'Lácteos' },
];

export const mockRecipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Bowl de quinoa saludable',
    category: 'Almuerzo',
    time: 20,
    calories: 480,
    ingredients: ['Quinoa', 'Tomate', 'Aguacate', 'Pollo'],
    steps: ['Cocina quinoa', 'Añade vegetales', 'Sirve con pollo'],
    allergens: ['None'],
    nutrition: { protein: 28, carbs: 45, fat: 18 },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r2',
    title: 'Tacos de pollo con salsa',
    category: 'Cena',
    time: 15,
    calories: 520,
    ingredients: ['Tortilla de maíz', 'Pollo', 'Tomate', 'Aguacate'],
    steps: ['Marca pollo', 'Arma tacos', 'Añade salsa'],
    allergens: ['Lácteos'],
    nutrition: { protein: 30, carbs: 40, fat: 22 },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r3',
    title: 'Ensalada rápida de atún',
    category: 'Desayuno',
    time: 10,
    calories: 360,
    ingredients: ['Atún', 'Tomate', 'Aguacate'],
    steps: ['Mezcla ingredientes', 'Sirve frío'],
    allergens: ['Pescado'],
    nutrition: { protein: 24, carbs: 18, fat: 14 },
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
  },
];

export const mockMarkets: Market[] = [
  { id: 'm1', name: 'Mercado Santa Anita', address: 'Av. Brasil 123', coords: { latitude: -12.0464, longitude: -77.0428 } },
  { id: 'm2', name: 'Mercado de Surquillo', address: 'Av. Benavides 456', coords: { latitude: -12.1200, longitude: -77.0300 } },
  { id: 'm3', name: 'Mercado de San Miguel', address: 'Av. La Marina 789', coords: { latitude: -12.0760, longitude: -77.0860 } },
];
