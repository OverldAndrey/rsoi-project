import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../../core/models/session';
import { UserLogin } from '../../core/models/user-login';
import { UserRegister } from '../../core/models/user-register';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public login(login: UserLogin) {
        const url = '/api/auth/login';
        return this.http.post<Session>(url, login);
    }

    public logout() {
        const url = '/api/auth/logout';
        return this.http.delete(url);
    }

    public register(user: UserRegister) {
        const url = '/api/auth/register';
        return this.http.post(url, user, { responseType: 'text' });
    }

}
