import {Body, Controller, Delete, Get, Headers, Param, Post, Res, UnauthorizedException} from '@nestjs/common';
import {Session} from "../../entities/session";
import {UserLogin} from "../../models/user-login";
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users/users.service";
import {Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../entities/user";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth: AuthService,
        private readonly users: UsersService,
        private readonly jwt: JwtService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Post('session')
    public async createSession(@Body() login: UserLogin, @Res() res: Response) {
        console.log(login);
        const user = await this.users.getByUsername(login.username);
        console.log(user);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get user by username ${login.username}`,
            timestamp: new Date().toISOString()
        });

        if (!user) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: user by username ${login.username} not found`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(404);
        }

        if (user.password !== this.users.createPwdHash(login.password)) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 401: user by username ${login.username} provided incorrect password`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(401);
        }

        const session = await this.auth.createOrUpdateSession({
            user: user,
            token: this.jwt.sign({ uid: user.id, rol: user.role, name: user.username }, {
                expiresIn: 36000,
            }),
            createDate: new Date(),
        });

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Created session for user with username ${login.username}, session id: ${session.id}`,
            timestamp: new Date().toISOString()
        });

        return res.status(200).send(session);
    }

    @Delete('session/:id')
    public async deleteSession(@Param('id') id: string) {
        await this.auth.deleteSession(Number(id));

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Deleted session with id ${id}`,
            timestamp: new Date().toISOString()
        });
    }

    @Post('validate')
    public async validateToken(@Body() body: { token: string }, @Res() res: Response) {
        const { token } = body;

        const session = await this.auth.getSessionByToken(token);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Got session with id ${session?.id} by token`,
            timestamp: new Date().toISOString()
        });

        if (!session) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 401: session by token not found`,
                timestamp: new Date().toISOString()
            });

            throw new UnauthorizedException();
        }

        let payload;
        try {
            payload = this.jwt.verify(token) as { uid: string, rol: string };
        } catch (e) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Session token verification failed, reason: ${e.message}`,
                timestamp: new Date().toISOString()
            });

            if (e.message === 'jwt expired') {
                await this.auth.deleteSession(session.id);

                this.statistics.addStatistic({
                    service: this.config.get('serviceName'),
                    description: `Deleted session with id ${session.id}`,
                    timestamp: new Date().toISOString()
                });
            }

            throw new UnauthorizedException(e);
        }

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Session token verified`,
            timestamp: new Date().toISOString()
        });

        const user = await this.users.getById(Number(payload.uid));

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Fetched user by id ${user.id} of verified payload`,
            timestamp: new Date().toISOString()
        });

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
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get session by token for external request`,
            timestamp: new Date().toISOString()
        });

        return this.auth.getSessionByToken(token);
    }
}
