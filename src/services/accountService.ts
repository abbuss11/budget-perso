import { api } from './api';
import type { Account } from '../models/compte';

export const accountService = {
  getAccounts: async () => api.get<Account[]>('/accounts'),
  totalBalance: (accounts: Account[]) =>
    accounts.reduce((total, account) => total + account.solde_initial, 0)
};
