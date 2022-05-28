import jwtDecode from 'jwt-decode';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Session } from '../../core/models/session';
import { TokenPayload } from '../../core/models/token-payload';
import { UserLogin } from '../../core/models/user-login';
import { UserRegister } from '../../core/models/user-register';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly SESSION_STORAGE_KEY = 'rsoi-cw-session';

    private readonly sessionSubject = new BehaviorSubject<Session | null>(null);

    public readonly sessionObservable = this.sessionSubject.asObservable();

    private readonly decodedTokenObservable = this.sessionObservable.pipe(
        map(session => session?.token),
        map(token => {
            if (!token) {
                return null;
            }

            try {
                return jwtDecode<TokenPayload>(token);
            } catch (err: unknown) {
                return null;
            }
        }),
    );

    public readonly roleObservable = this.decodedTokenObservable.pipe(
        map(payload => payload?.rol),
    );

    public readonly nameObservable = this.decodedTokenObservable.pipe(
        map(payload => payload?.name),
    );

    public get session() {
        return this.sessionSubject.value;
    }

    constructor(
        private readonly authApi: AuthApiService,
    ) {
        const session = localStorage.getItem(this.SESSION_STORAGE_KEY);

        if (session) {
            this.sessionSubject.next(JSON.parse(session) as Session);
        }
    }

    public async login(login: UserLogin) {
        let session;
        try {
            session = await firstValueFrom(this.authApi.login(login));
        } catch (err: unknown) {
            this.removeSession();
            throw err;
        }

        localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(session));
        this.sessionSubject.next(session);
    }

    public async register(userData: UserRegister) {
        await firstValueFrom(this.authApi.register(userData));
    }

    public async logout() {
        try {
            await firstValueFrom(this.authApi.logout());
        } catch (err: unknown) {
            console.log(err);
        }

        this.removeSession();
    }

    public removeSession() {
        localStorage.removeItem(this.SESSION_STORAGE_KEY);
        this.sessionSubject.next(null);
    }

}
