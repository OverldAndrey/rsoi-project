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

@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @Get('')
    public async getUserInfo(
        @Headers('X-User-Id') userId: string,
        @Res() res: Response,
    ) {
        console.log('X-User-Id', userId);
        const user = await this.users.getById(Number(userId));

        if (!user) {
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

        if (!user) {
            return res.sendStatus(404);
        }

        return res.status(200).send(user);
    }

    @Post('')
    public async createUser(@Body() user: Partial<User>) {
        return this.users.addOrUpdateOne(user);
    }

    @Patch('')
    public async updateUser(@Body() user: Partial<User>, @Res() res: Response) {
        const oldUser = await this.users.getById(user.id);

        if (!oldUser) {
            return res.sendStatus(404);
        }

        const newUser = await this.users.addOrUpdateOne({ ...oldUser, ...user });

        return res.status(200).send(newUser);
    }
}
