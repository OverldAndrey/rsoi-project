import {Injectable, Scope} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {User} from "../../models/user";
import {map} from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {}

    public getUser(userId: number) {
        const url = '/users';
        return this.http
            .get(this.config.get('authAddress') + url, { headers: { 'X-User-Id': userId } })
            .pipe(
                map(res => res.data as User),
            );
    }

    public getUserByName(username: string) {
        const url = '/users/name';
        return this.http
            .get(this.config.get('authAddress') + url, { headers: { 'X-User-Name': username } })
            .pipe(
                map(res => res.data as User),
            );
    }

    public createUser(user: Partial<User>) {
        const url = '/users';
        return this.http
            .post(this.config.get('authAddress') + url, user)
            .pipe(
                map(res => res.data as User),
            );
    }

    public updateUser(user: Partial<User>) {
        const url = '/users';
        return this.http
            .patch(this.config.get('authAddress') + url, user)
            .pipe(
                map(res => res.data as User),
            );
    }
}
