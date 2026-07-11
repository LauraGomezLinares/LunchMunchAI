import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { AuthUser, Allergen, DietaryPreference, UserProfile } from '../types';
import { loginMock, logoutMock, registerMock } from '../services/authService';

interface AuthState {
  loading: boolean;
  token: string | null;
  user: AuthUser | null;
  onboardCompleted: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (profile: Omit<UserProfile, 'id' | 'token'> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (profile: { preferences: DietaryPreference[]; allergens: Allergen[] }) => Promise<void>;
}

const SESSION_TOKEN_KEY = 'session_token';
const USER_PROFILE_KEY = 'user_profile';

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: true,
  token: null,
  user: null,
  onboardCompleted: false,
  initialize: async () => {
    const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
    const serialized = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (token && serialized) {
      const savedUser = JSON.parse(serialized) as AuthUser;
      set({ token, user: savedUser, onboardCompleted: savedUser.onboardCompleted ?? false });
    }
    set({ loading: false });
  },
  login: async (email, password) => {
    const authUser = await loginMock(email, password);
    await AsyncStorage.setItem(SESSION_TOKEN_KEY, authUser.token);
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(authUser));
    set({ token: authUser.token, user: authUser, onboardCompleted: authUser.onboardCompleted });
  },
  register: async (profile) => {
    const authUser = await registerMock(profile);
    await AsyncStorage.setItem(SESSION_TOKEN_KEY, authUser.token);
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(authUser));
    set({ token: authUser.token, user: authUser, onboardCompleted: authUser.onboardCompleted });
  },
  logout: async () => {
    await logoutMock();
    await AsyncStorage.multiRemove([SESSION_TOKEN_KEY, USER_PROFILE_KEY]);
    set({ token: null, user: null, onboardCompleted: false });
  },
  completeOnboarding: async ({ preferences, allergens }) => {
    const current = get().user;
    if (!current) return;
    const updatedUser: AuthUser = {
      ...current,
      preferences,
      allergens,
      onboardCompleted: true,
    };
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedUser));
    set({ user: updatedUser, onboardCompleted: true });
  },
}));
