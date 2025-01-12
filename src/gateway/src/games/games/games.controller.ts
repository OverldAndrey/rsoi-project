import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    Headers,
    Query,
    UseGuards,
    Req,
    BadRequestException,
    NotFoundException, ServiceUnavailableException, ForbiddenException, UnprocessableEntityException, ConflictException
} from '@nestjs/common';
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
import {RolesGuard} from "../../auth/guards/roles.guard";
import {Transaction} from "../../models/transaction";

@Controller('')
export class GamesController {
    constructor(
        private readonly games: GamesService,
        private readonly transactions: TransactionsService,
        private readonly users: UsersService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Get('')
    public getGames(@Query('page') page: string, @Query('size') size: string) {
        const pageNum = Number(page);
        const sizeNum = Number(size);

        if ((pageNum && (isNaN(pageNum) || pageNum < 0)) || (sizeNum && (isNaN(sizeNum) || sizeNum < 1))) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 400: Get games wrong request`,
                timestamp: new Date().toISOString(),
            });

            return new BadRequestException();
        }

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get all games for page ${page} of size ${size}`,
            timestamp: new Date().toISOString(),
        });

        return firstValueFrom(this.games.getAllGames(pageNum, sizeNum));
    }

    @Get(':id')
    public async getGameById(@Param('id') id: string, @Res() res: Response) {
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get a game by id ${id}`,
            timestamp: new Date().toISOString(),
        });

        const game = await firstValueFrom(this.games.getGameById(Number(id)));

        if (!game || game.id === 0) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: game with id ${id} not found`,
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        return res.status(200).send(game);
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard('custom'), RolesGuard)
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
            timestamp: new Date().toISOString(),
        });

        if (!game || game.id === 0) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: game with id ${id} not found`,
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        const userId = (req['verifiedUser'] as User).id;

        let user;
        try {
            user = await firstValueFrom(this.users.getUser(userId));
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        this.statistics.addStatistic({
            description: `Get user by id ${userId}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString(),
        });

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 403: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(403).send(new ForbiddenException());
        }

        if (user.balance < game.price) {
            this.statistics.addStatistic({
                description: `Error 422: user has insufficient balance`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(422).send(new UnprocessableEntityException());
        }

        let transaction: Transaction;
        try {
            const userTransactions = await firstValueFrom(this.transactions.getUsersTransactions(userId));

            this.statistics.addStatistic({
                description: `Get transactions for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            if (userTransactions.some(t => t.gameId === game.id)) {
                this.statistics.addStatistic({
                    description: `Error 409: User with id ${userId} already has game with id ${game.id}`,
                    service: this.config.get('serviceName'),
                    timestamp: new Date().toISOString(),
                });

                return res.status(409).send(new ConflictException());
            }

            transaction = await firstValueFrom(this.transactions.addTransaction({
                gameId,
                sum: game.price,
                type: 'buy',
            }, userId));

            this.statistics.addStatistic({
                description: `Add buying transaction for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        try {
            const updatedUser = await firstValueFrom(this.users.updateUser({
                id: user.id,
                balance: user.balance - game.price,
            }));

            this.statistics.addStatistic({
                description: `Update balance for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            this.transactions.cancelTransaction(transaction.id);

            this.statistics.addStatistic({
                description: `Cancel buying transaction with id ${transaction.id} for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(503).send(new ServiceUnavailableException());
        }

        return res.status(200).send({});
    }
}
