import { Module } from '@nestjs/common';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game';
import { StatisticsModule } from "../statistics/statistics.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), StatisticsModule, ConfigModule],
    providers: [GamesService],
    controllers: [GamesController],
})
export class GamesModule {}
