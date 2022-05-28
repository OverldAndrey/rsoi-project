import { Game } from '../../core/models/game';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../core/models/user';
import { UserBalance } from '../../core/models/user-balance';

@Injectable({
    providedIn: 'root',
})
export class UsersApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public getUserInfo() {
        const url = '/api/me';
        return this.http.get<User>(url);
    }

    public getUserBalance() {
        const url = '/api/me/wallet';
        return this.http.get<UserBalance>(url);
    }

    public fillUserBalance(balanceDiff: UserBalance) {
        const url = '/api/me/wallet';
        return this.http.patch(url, balanceDiff);
    }

    public getUserLibrary() {
        const url = '/api/me/library';
        return this.http.get<Game[]>(url);
    }

}
