import {Controller, Get, Param, Post, Res, Headers, Query} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {GamesService} from "./games.service";
import {Response} from "express";
import {TransactionsService} from "../../users/transactions/transactions.service";
import {UsersService} from "../../users/users/users.service";

@Controller('')
export class GamesController {
    constructor(
        private readonly games: GamesService,
        private readonly transactions: TransactionsService,
        private readonly users: UsersService,
    ) {}

    @Get()
    public getGames(@Query('page') page: number, @Query('size') size: number) {
        return firstValueFrom(this.games.getAllGames(page, size));
    }

    @Get(':id')
    public getGameById(@Param('id') id: string) {
        return firstValueFrom(this.games.getGameById(Number(id)));
    }

    @Post(':id/buy')
    public async buyGame(
        @Param('id') id: string,
        @Headers('Authorization') authHeader: string,
        @Res() res: Response
    ) {
        const gameId = Number(id);
        const game = await firstValueFrom(this.games.getGameById(gameId));

        if (!game) {
            return res.sendStatus(404);
        }

        // TODO: Extract user id from token
        const userId = Number(authHeader);

        const user = await firstValueFrom(this.users.getUser(userId));
        console.log(user);

        if (!user) {
            return res.sendStatus(403);
        }

        if (user.balance < game.price) {
            return res.sendStatus(422);
        }

        const transaction = await firstValueFrom(this.transactions.addTransaction({
            gameId,
            sum: game.price,
            type: 'buy',
        }, userId));

        const updatedUser = await firstValueFrom(this.users.updateUser({
            id: user.id,
            balance: user.balance - game.price,
        }));

        return res.status(200).send({});
    }
}
