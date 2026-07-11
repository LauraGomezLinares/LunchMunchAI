import { AuthUser, DietaryPreference, UserProfile } from '../types';
import { mockedUsers } from '../mocks/users';

const WAIT_TIME = 800;

export async function loginMock(email: string, password: string): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockedUsers.find((item) => item.email === email && item.password === password);
      if (!user) {
        reject(new Error('Email o contraseña incorrectos.'));
        return;
      }
      resolve(user);
    }, WAIT_TIME);
  });
}

export async function registerMock(profile: Omit<UserProfile, 'id' | 'token'> & { password: string }): Promise<AuthUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        token: `token-${Date.now()}`,
        onboardCompleted: false,
        ...profile,
      };
      resolve(newUser);
    }, WAIT_TIME);
  });
}

export async function logoutMock(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300));
}
