import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { GamesService } from './games.service';
import { Response } from 'express';
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigService} from "@nestjs/config";

@Controller('games')
export class GamesController {
    constructor(
        private readonly games: GamesService,
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Get('')
    public async getGames(
        @Query('page') page?: number,
        @Query('size') size?: number,
    ) {
        await this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get games on page ${page} of size ${size}`,
            timestamp: new Date().toISOString(),
        });
        return this.games.getAll(page, size);
    }

    @Get(':id')
    public async getGameById(@Param('id') id: number, @Res() res: Response) {
        const game = await this.games.getOneById(id);

        await this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get game with id ${id}`,
            timestamp: new Date().toISOString(),
        });

        if (!game) {
            await this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 404: game with id ${id} not found`,
                timestamp: new Date().toISOString(),
            });

            return res.status(404).send('Game not found');
        }

        return res.status(200).send(game);
    }
}
