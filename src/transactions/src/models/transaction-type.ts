export type TransactionType = typeof transactionTypes[number];

export const transactionTypes = ['fill', 'buy'] as const;
