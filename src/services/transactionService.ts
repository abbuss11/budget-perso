import { api } from './api';
import type { Category, Transaction, TransactionType } from '../models/depenses';

export const transactionService = {
  getTransactions: async () => api.get<Transaction[]>('/transactions'),
  getCategories: async () => api.get<Category[]>('/categories'),
  sumByType: (transactions: Transaction[], type: TransactionType) =>
    transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + transaction.montant, 0)
};
