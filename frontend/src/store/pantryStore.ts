import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { PantryItem } from '../types';
import { mockedPantry } from '../mocks/pantry';

const PANTRY_KEY = 'pantry_items';

interface PantryState {
  loading: boolean;
  items: PantryItem[];
  initialize: () => Promise<void>;
  addItem: (item: Omit<PantryItem, 'id'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

export const usePantryStore = create<PantryState>((set, get) => ({
  loading: true,
  items: [],
  initialize: async () => {
    const stored = await AsyncStorage.getItem(PANTRY_KEY);
    if (stored) {
      set({ items: JSON.parse(stored) as PantryItem[] });
    } else {
      set({ items: mockedPantry });
    }
    set({ loading: false });
  },
  addItem: async (item) => {
    const newItem: PantryItem = { id: `pantry-${Date.now()}`, ...item };
    const updated = [...get().items, newItem];
    await AsyncStorage.setItem(PANTRY_KEY, JSON.stringify(updated));
    set({ items: updated });
  },
  removeItem: async (id) => {
    const updated = get().items.filter((item) => item.id !== id);
    await AsyncStorage.setItem(PANTRY_KEY, JSON.stringify(updated));
    set({ items: updated });
  },
}));
