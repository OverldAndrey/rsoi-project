import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {UserLogin} from "../../models/user-login";
import {ConfigService} from "@nestjs/config";
import {Session} from "../../models/session";
import {map} from "rxjs";

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
}
