import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppState, Ingredient, UserProfile } from '../types';

const initialState: AppState = {
  isAuthenticated: false,
  onboardingComplete: false,
  user: null,
  pantry: [],
  token: null,
  isHydrated: false,
};

export const useAppStore = create<AppState & {
  initialize: (state?: Partial<AppState>) => void;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  setOnboardingComplete: () => void;
  addPantryItem: (item: Ingredient) => void;
  removePantryItem: (id: string) => void;
  updateUser: (user: UserProfile) => void;
}>()(
  persist(
    (set) => ({
      ...initialState,
      initialize: (state) => set({ ...initialState, ...state, isHydrated: true }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setOnboardingComplete: () => set({ onboardingComplete: true }),
      addPantryItem: (item) => set((state) => ({ pantry: state.pantry.some((i) => i.id === item.id) ? state.pantry : [...state.pantry, item] })),
      removePantryItem: (id) => set((state) => ({ pantry: state.pantry.filter((item) => item.id !== id) })),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'lunchmunchai-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        onboardingComplete: state.onboardingComplete,
        user: state.user,
        pantry: state.pantry,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
