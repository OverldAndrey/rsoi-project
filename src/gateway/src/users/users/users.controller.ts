import {
    Body,
    Controller,
    Get,
    Headers,
    NotFoundException,
    Patch,
    Req,
    Res,
    ServiceUnavailableException,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "../../models/user";
import {firstValueFrom, forkJoin, map, switchMap} from "rxjs";
import {Request, Response} from "express";
import {FillBalanceRequest} from "../../models/fill-balance-request";
import {GamesService} from "../../games/games/games.service";
import {TransactionsService} from "../transactions/transactions.service";
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../models/role.enum";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigService} from "@nestjs/config";
import {RolesGuard} from "../../auth/guards/roles.guard";
import {Transaction} from "../../models/transaction";

@Controller('')
export class UsersController {
    constructor(
        private readonly users: UsersService,
        private readonly games: GamesService,
        private readonly transactions: TransactionsService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Roles(Role.User)
    @UseGuards(AuthGuard('custom'), RolesGuard)
    @Get('')
    public async getUserInfo(@Req() req: Request, @Res() res: Response) {
        const userId = (req['verifiedUser'] as User).id;

        let user;
        try {
            user = await firstValueFrom(this.users.getUser(userId));

            this.statistics.addStatistic({
                description: `Get user by id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 404: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard('custom'), RolesGuard)
    @Get('library')
    public async getUserLibrary(@Req() req: Request, @Res() res: Response) {
        const userId = (req['verifiedUser'] as User).id;

        let user;
        try {
            user = await firstValueFrom(this.users.getUser(userId));

            this.statistics.addStatistic({
                description: `Get user by id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 404: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        const libraryGames = await firstValueFrom(this.transactions.getUsersTransactions(userId).pipe(
            map(transactions => transactions.filter(t => t.gameId)),
            switchMap(transactions => forkJoin(transactions.map(t => this.games.getGameById(t.gameId))))
        ));

        this.statistics.addStatistic({
            description: `Got library for user with id ${userId}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString(),
        });

        return res.status(200).send(libraryGames);
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard('custom'), RolesGuard)
    @Get('wallet')
    public async getUserBalance(@Req() req: Request, @Res() res: Response) {
        const userId = (req['verifiedUser'] as User).id;

        let user;
        try {
            user = await firstValueFrom(this.users.getUser(userId));

            this.statistics.addStatistic({
                description: `Get user by id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 404: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        return res.status(200).send({ amount: user.balance } as FillBalanceRequest);
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard('custom'), RolesGuard)
    @Patch('wallet')
    public async fillUserBalance(
        @Req() req: Request,
        @Body() fillReq: FillBalanceRequest,
        @Res() res: Response
    ) {
        const userId = (req['verifiedUser'] as User).id;

        let user;
        try {
            user = await firstValueFrom(this.users.getUser(userId));

            this.statistics.addStatistic({
                description: `Get user by id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        if (!user) {
            this.statistics.addStatistic({
                description: `Error 404: user with id ${userId} not found`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send(new NotFoundException());
        }

        let transaction: Transaction;
        try {
            transaction = await firstValueFrom(this.transactions.addTransaction({
                sum: fillReq.amount,
                type: 'fill',
            }, userId));

            this.statistics.addStatistic({
                description: `Add transaction with balance fill for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            return res.status(503).send(new ServiceUnavailableException());
        }

        try {
            await firstValueFrom(this.users.updateUser({ balance: user.balance + fillReq.amount }));

            this.statistics.addStatistic({
                description: `Fill balance for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });
        } catch (e) {
            this.transactions.cancelTransaction(transaction.id);

            this.statistics.addStatistic({
                description: `Cancel transaction with balance fill for user with id ${userId}`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(503).send(new ServiceUnavailableException());
        }

        return res.status(200).send({});
    }
}
