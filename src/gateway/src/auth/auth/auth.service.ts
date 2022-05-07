import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {UserLogin} from "../../models/user-login";
import {ConfigService} from "@nestjs/config";
import {Session} from "../../models/session";
import {map} from "rxjs";
import {User} from "../../models/user";

@Injectable()
export class AuthService {
    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {}

    public createSession(login: UserLogin) {
        const url = '/auth/session';
        return this.http.post<Session>(this.config.get('authAddress') + url, login).pipe(
            map(res => res.data as Session),
        );
    }

    public deleteSession(sessionId: number) {
        const url = `/auth/session/${sessionId}`;
        return this.http.delete(this.config.get('authAddress') + url).pipe(
            map(res => res.data),
        );
    }

    public validate(token: string) {
        const url = '/auth/validate';

        return this.http.post(this.config.get('authAddress') + url, { token }).pipe(
            map(res => res.data as User),
        )
    }

    public getSessionByToken(token: string) {
        const url = '/auth/session';

        return this.http
            .get<Session>(this.config.get('authAddress') + url, { headers: { 'Authorization': token } })
            .pipe(
                map(res => res.data as Session),
            );
    }
}
