export interface Statistic {
    id: number;
    service: ServiceType;
    description: string;
    timestamp: string;
}

export const serviceTypes = [
    'gateway',
    'games',
    'transactions',
    'sessions',
    'statistics',
] as const;
export type ServiceType = typeof serviceTypes[number];
