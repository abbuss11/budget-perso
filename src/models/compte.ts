export type AccountType = 'CASH' | 'MOBILE_MONEY' | 'BANQUE' | 'EPARGNE';

export type Account = {
  id: string;
  nom: string;
  type: AccountType;
  solde_initial: number;
};
