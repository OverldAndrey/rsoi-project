import {Body, Controller, Delete, Param, Post, Res} from '@nestjs/common';
import {Session} from "../../entities/session";
import {UserLogin} from "../../models/user-login";
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users/users.service";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
        private readonly users: UsersService,
    ) {}

    @Post('session')
    public async createSession(@Body() login: UserLogin, @Res() res: Response) {
        console.log(login);
        const user = await this.users.getByUsername(login.username);
        console.log(user);

        if (!user) {
            return res.sendStatus(404);
        }

        if (user.password !== login.password) {
            return res.sendStatus(401);
        }

        const session = await this.auth.createOrUpdateSession({
            user: user,
            token: `${user.id}`, // TODO: Generate JWT
            createDate: new Date(),
        });

        return res.status(200).send(session);
    }

    @Delete('session/:id')
    public async deleteSession(@Param('id') id: string) {
        await this.auth.deleteSession(Number(id));
    }
}
