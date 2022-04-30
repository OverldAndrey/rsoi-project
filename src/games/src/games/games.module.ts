import { Module } from '@nestjs/common';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game';

@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    providers: [GamesService],
    controllers: [GamesController],
})
export class GamesModule {}
