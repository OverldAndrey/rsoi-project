import {Body, Controller, Get, Headers, Patch, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "../../models/user";
import {firstValueFrom, forkJoin, map, switchMap} from "rxjs";
import {Response} from "express";
import {FillBalanceRequest} from "../../models/fill-balance-request";
import {GamesService} from "../../games/games/games.service";
import {TransactionsService} from "../transactions/transactions.service";

@Controller('')
export class UsersController {
    constructor(
        private readonly users: UsersService,
        private readonly games: GamesService,
        private readonly transactions: TransactionsService,
    ) {}

    @Get('')
    public async getUserInfo(@Headers('Authorization') authHeader: string, @Res() res: Response) {
        // TODO: Extract from header
        const userId = Number(authHeader);

        const user = await firstValueFrom(this.users.getUser(userId));

        if (!user) {
            return res.sendStatus(404);
        }

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }

    @Get('library')
    public async getUserLibrary(@Headers('Authorization') authHeader: string, @Res() res: Response) {
        // TODO: Extract from header
        const userId = Number(authHeader);

        const user = await firstValueFrom(this.users.getUser(userId));

        if (!user) {
            return res.sendStatus(404);
        }

        const libraryGames = await firstValueFrom(this.transactions.getUsersTransactions(userId).pipe(
            map(transactions => transactions.filter(t => t.gameId)),
            switchMap(transactions => forkJoin(transactions.map(t => this.games.getGameById(t.gameId))))
        ));

        return res.status(200).send(libraryGames);
    }

    @Get('wallet')
    public async getUserBalance(@Headers('Authorization') authHeader: string, @Res() res: Response) {
        // TODO: Extract from header
        const userId = Number(authHeader);

        const user = await firstValueFrom(this.users.getUser(userId));

        if (!user) {
            return res.sendStatus(404);
        }

        return res.status(200).send({ amount: user.balance } as FillBalanceRequest);
    }

    @Patch('wallet')
    public async fillUserBalance(
        @Headers('Authorization') authHeader: string,
        @Body() fillReq: FillBalanceRequest,
        @Res() res: Response
    ) {
        // TODO: Extract from header
        const userId = Number(authHeader);

        const user = await firstValueFrom(this.users.getUser(userId));

        if (!user) {
            return res.sendStatus(404);
        }

        const transaction = await firstValueFrom(this.transactions.addTransaction({
            sum: fillReq.amount,
            type: 'fill',
        }, userId));

        await firstValueFrom(this.users.updateUser({ balance: user.balance + fillReq.amount }));

        return res.status(200).send({});
    }
}
