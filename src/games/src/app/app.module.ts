import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from '../games/games.module';
import {StatisticsModule} from "../statistics/statistics.module";

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forRoot(),
        GamesModule,
        StatisticsModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
    exports: [ConfigService],
})
export class AppModule {}
