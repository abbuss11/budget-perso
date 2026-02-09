import { api } from './api';
import type { User } from '../models/user';

const STORAGE_KEY = 'budget_user';

export const authService = {
  async login(email: string) {
    const users = await api.get<User[]>(`/users?email=${encodeURIComponent(email)}`);
    const user = users[0];
    if (!user) {
      throw new Error('Utilisateur introuvable.');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },
  async signup(payload: Omit<User, 'id'>) {
    const created = await api.post<User>('/users', payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    return created;
  },
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }
};
