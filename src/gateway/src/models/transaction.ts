export interface Transaction {
    id: number;
    userId: number;
    gameId: number | null;
    type: TransactionType;
    sum: number;
}

export type TransactionType = typeof transactionTypes[number];

export const transactionTypes = ['fill', 'buy'] as const;
