import {Controller, Get, Param, Post, Res, Headers, Query, UseGuards, Req} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {GamesService} from "./games.service";
import {Request, Response} from "express";
import {TransactionsService} from "../../users/transactions/transactions.service";
import {UsersService} from "../../users/users/users.service";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../../models/user";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../models/role.enum"
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigService} from "@nestjs/config";

@Controller('')
export class GamesController {
    constructor(
        private readonly games: GamesService,
        private readonly transactions: TransactionsService,
        private readonly users: UsersService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Get()
    public getGames(@Query('page') page: number, @Query('size') size: number) {
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get all games for page ${page} of size ${size}`,
            timestamp: new Date().toISOString()
        });

        return firstValueFrom(this.games.getAllGames(page, size));
    }

    @Get(':id')
    public getGameById(@Param('id') id: string) {
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get a game by id ${id}`,
            timestamp: new Date().toISOString()
        });

        return firstValueFrom(this.games.getGameById(Number(id)));
    }

    @UseGuards(AuthGuard('custom'))
    @Roles(Role.User)
    @Post(':id/buy')
    public async buyGame(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const gameId = Number(id);
        const game = await firstValueFrom(this.games.getGameById(gameId));

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get a game by id ${id}`,
            timestamp: new Date().toISOString()
        });

        if (!game) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: game with id ${id} not found`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(404);
        }

        const userId = (req['verifiedUser'] as User).id;

        const user = await firstValueFrom(this.users.getUser(userId));
        console.log(user);

        this.statistics.addStatistic({
            description: `Get user by id ${userId}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString()
        });

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 403: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(403);
        }

        if (user.balance < game.price) {
            this.statistics.addStatistic({
                description: `Error 422: user has insufficient balance`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(422);
        }

        this.statistics.addStatistic({
            description: `Add buying transaction for user with id ${userId}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString()
        });

        const transaction = await firstValueFrom(this.transactions.addTransaction({
            gameId,
            sum: game.price,
            type: 'buy',
        }, userId));

        this.statistics.addStatistic({
            description: `Update balance for user with id ${userId}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString()
        });

        const updatedUser = await firstValueFrom(this.users.updateUser({
            id: user.id,
            balance: user.balance - game.price,
        }));

        return res.status(200).send({});
    }
}
