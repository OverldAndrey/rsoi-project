import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Strategy} from "passport-custom";
import {Request} from "express";
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../../users/users/users.service";
import {firstValueFrom} from "rxjs";

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly auth: AuthService,
    ) {
        super();
    }

    async validate(payload: Request) {
        const header = payload.header('Authorization');

        if (!header) {
            throw new UnauthorizedException();
        }

        const token = header.replace('Bearer ', '');

        try {
            payload['verifiedUser'] = await firstValueFrom(this.auth.validate(token));
        } catch (e) {
            throw new UnauthorizedException(e);
        }
        payload['token'] = token;
        // console.log(payload.user);
        return payload;
    }
}
