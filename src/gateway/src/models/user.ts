export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    role: 'User' | 'Admin';
    balance: number;
}
