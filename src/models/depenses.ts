export type TransactionType = 'DEPENSE' | 'REVENU';

export type Transaction = {
  id: string;
  montant: number;
  date: string;
  note: string;
  type: TransactionType;
  categorieId: string;
  compteId: string;
  date_creation: string;
};

export type Category = {
  id: string;
  nom: string;
  type: TransactionType | 'EPARGNE';
  icone: string;
};
