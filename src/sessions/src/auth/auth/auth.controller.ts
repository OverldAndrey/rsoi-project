import {Body, Controller, Delete, Get, Headers, Param, Post, Res, UnauthorizedException} from '@nestjs/common';
import {Session} from "../../entities/session";
import {UserLogin} from "../../models/user-login";
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users/users.service";
import {Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../entities/user";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
        private readonly users: UsersService,
        private readonly jwt: JwtService,
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
            token: this.jwt.sign({ uid: user.id, rol: user.role }, {
                expiresIn: 3600,
            }),
            createDate: new Date(),
        });

        return res.status(200).send(session);
    }

    @Delete('session/:id')
    public async deleteSession(@Param('id') id: string) {
        await this.auth.deleteSession(Number(id));
    }

    @Post('validate')
    public async validateToken(@Body() body: { token: string }, @Res() res: Response) {
        const { token } = body;

        const session = await this.auth.getSessionByToken(token);

        if (!session) {
            throw new UnauthorizedException();
        }

        let payload;
        try {
            payload = this.jwt.verify(token) as { uid: string, rol: string };
        } catch (e) {
            if (e.message === 'jwt expired') {
                await this.auth.deleteSession(session.id);
            }

            throw new UnauthorizedException(e);
        }

        const user = await this.users.getById(Number(payload.uid));

        return res.status(200).send({
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            balance: user.balance
        } as Partial<User>);
    }

    @Get('session')
    public async getUserSession(@Headers('Authorization') token: string) {
        return this.auth.getSessionByToken(token);
    }
}
