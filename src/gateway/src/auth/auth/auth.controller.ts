import {Body, Controller, Delete, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserLogin} from "../../models/user-login";
import {firstValueFrom} from "rxjs";
import {UsersService} from "../../users/users/users.service";
import {RegisterRequest} from "../../models/register-request";
import {User} from "../../models/user";
import {Request, Response} from "express";
import {AuthGuard} from "@nestjs/passport";

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

    @UseGuards(AuthGuard('custom'))
    @Delete('logout')
    public async logout(@Req() req: Request) {
        const session = await firstValueFrom(this.auth.getSessionByToken(req['token']));

        return firstValueFrom(this.auth.deleteSession(session.id));
    }

    @Post('register')
    public async register(@Body() body: RegisterRequest, @Res() res: Response) {
        const user = { ...body, balance: 0, role: 'User' } as Partial<User>;

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
