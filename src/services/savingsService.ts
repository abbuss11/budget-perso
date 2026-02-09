import { api } from './api';
import type { Savings } from '../models/savings';

export const savingsService = {
  getSavings: async () => api.get<Savings[]>('/savings'),
  totalSaved: (items: Savings[]) =>
    items.reduce((total, saving) => total + saving.montant, 0)
};
