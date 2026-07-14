type Account = {
  accountCode: string;
  accountDescription: string;
};

export const accounts: Record<string, Account> = {
  checkingAccount: {
    accountCode: 'ACC001',
    accountDescription: 'Cuenta Corriente',
  },
  savingsAccount: {
    accountCode: 'ACC002',
    accountDescription: 'Caja de Ahorro',
  },
};
