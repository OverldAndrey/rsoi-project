import {Body, Controller, Delete, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserLogin} from "../../models/user-login";
import {firstValueFrom} from "rxjs";
import {UsersService} from "../../users/users/users.service";
import {RegisterRequest} from "../../models/register-request";
import {User} from "../../models/user";
import {Response} from "express";

@Controller('')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
        private readonly users: UsersService,
    ) {}

    @Post('login')
    public async login(@Body() login: UserLogin) {
        return firstValueFrom(this.auth.createSession(login));
    }

    @Delete('logout')
    public logout() {}

    @Post('register')
    public async register(@Body() body: RegisterRequest, @Res() res: Response) {
        const user = { ...body, balance: 0 } as Partial<User>;

        try {
            const prevUser = await firstValueFrom(this.users.getUserByName(user.username));

            if (prevUser) {
                return res.sendStatus(409);
            }
        } catch (e) {
            console.log(e.toJSON());
            if (e.toJSON().status !== 404) {
                throw e;
            }
        }

        await firstValueFrom(this.users.createUser(user));

        return res.sendStatus(200);
    }
}
