import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    constructor(
        private readonly usersApi: UsersApiService,
    ) { }

    public async getCurrentUserInfo() {
        return firstValueFrom(this.usersApi.getUserInfo());
    }

    public async getCurrentUserBalance() {
        return firstValueFrom(this.usersApi.getUserBalance());
    }

    public async fillBalance(amount: number) {
        await firstValueFrom(this.usersApi.fillUserBalance({ amount }));

        return this.getCurrentUserBalance();
    }

    public async getLibrary() {
        return firstValueFrom(this.usersApi.getUserLibrary());
    }

}
