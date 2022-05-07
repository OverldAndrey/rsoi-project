import {
    Body,
    Controller,
    Get,
    Headers,
    Patch,
    Post,
    Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { User } from '../../entities/user';
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigService} from "@nestjs/config";

@Controller('users')
export class UsersController {
    constructor(
        private readonly users: UsersService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Get('')
    public async getUserInfo(
        @Headers('X-User-Id') userId: string,
        @Res() res: Response,
    ) {
        console.log('X-User-Id', userId);
        const user = await this.users.getById(Number(userId));

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Got user by id ${userId}`,
            timestamp: new Date().toISOString()
        });

        if (!user) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: user with id ${userId} not found`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(404);
        }

        return res.status(200).send(user);
    }

    @Get('name')
    public async getUserByName(
        @Headers('X-User-Name') username: string,
        @Res() res: Response,
    ) {
        const user = await this.users.getByUsername(username);
        console.log(user);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Got user by username ${username}`,
            timestamp: new Date().toISOString()
        });

        if (!user) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: user with username ${username} not found`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(404);
        }

        return res.status(200).send(user);
    }

    @Post('')
    public async createUser(@Body() user: Partial<User>, @Res() res: Response) {
        const oldUser = await this.users.getByUsername(user.username);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Got user by username ${user.username}`,
            timestamp: new Date().toISOString()
        });

        if (oldUser) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 409: User with username ${user.username} already exists`,
                timestamp: new Date().toISOString()
            });

            return res.status(409).send({});
        }

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Creating user with username ${user.username}`,
            timestamp: new Date().toISOString()
        });

        return res.status(200).send(await this.users.addOrUpdateOne(user));
    }

    @Patch('')
    public async updateUser(@Body() user: Partial<User>, @Res() res: Response) {
        const oldUser = await this.users.getById(user.id);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Got user by id ${user.id}`,
            timestamp: new Date().toISOString()
        });

        if (!oldUser) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: user with id ${user.id} not found`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(404);
        }

        const newUser = await this.users.addOrUpdateOne({ ...oldUser, ...user });

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Updated user with id ${user.id}`,
            timestamp: new Date().toISOString()
        });

        return res.status(200).send(newUser);
    }
}
