import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { GamesService } from './games.service';
import { Response } from 'express';

@Controller('games')
export class GamesController {
    constructor(private games: GamesService) {}

    @Get('')
    public getGames(
        @Query('page') page?: number,
        @Query('size') size?: number,
    ) {
        return this.games.getAll(page, size);
    }

    @Get(':id')
    public async getGameById(@Param('id') id: number, @Res() res: Response) {
        const game = await this.games.getOneById(id);

        if (!game) {
            return res.status(404).send('Game not found');
        }

        return res.status(200).send(game);
    }
}
