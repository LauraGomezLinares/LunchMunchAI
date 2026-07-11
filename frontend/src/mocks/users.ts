import { AuthUser } from '../types';

export const mockedUsers: AuthUser[] = [
  {
    id: 'user-01',
    name: 'Camila Rojas',
    email: 'camila@lunchmunch.ai',
    age: 28,
    location: 'Lima Metropolitana',
    preferences: ['omnivore'],
    allergens: ['gluten'],
    password: 'Lunch2026!',
    token: 'mock-token-123',
    onboardCompleted: false,
  },
];
