import { PantryItem } from '../types';

export const mockedPantry: PantryItem[] = [
  {
    id: 'pantry-01',
    name: 'Quinua',
    category: 'Granos y Cereales',
    quantity: '500 g',
    freshness: 'Alta',
    icon: 'grain',
  },
  {
    id: 'pantry-02',
    name: 'Pollo',
    category: 'Proteína',
    quantity: '2 pechugas',
    freshness: 'Media',
    icon: 'drumstick',
  },
  {
    id: 'pantry-03',
    name: 'Leche de almendra',
    category: 'Líquidos',
    quantity: '1 L',
    freshness: 'Alta',
    icon: 'bottle',
  },
];
