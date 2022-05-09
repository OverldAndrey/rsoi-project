export interface TokenPayload {
    uid: number;
    rol: 'Admin' | 'User';
    iat: number;
    exp: number;
}
