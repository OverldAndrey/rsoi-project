import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RouterModule, Routes} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config/configuration";
import {GamesModule} from "../games/games.module";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {StatisticsModule} from "../statistics/statistics.module";

const routes: Routes = [
    {
        path: '/api',
        children: [
            {
                path: '/games',
                module: GamesModule,
            },
            {
                path: '/me',
                module: UsersModule,
            },
            {
                path: '/auth',
                module: AuthModule,
            },
            {
                path: '/statistics',
                module: StatisticsModule,
            }
        ]
    }
];

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        RouterModule.register(routes),
        GamesModule,
        AuthModule,
        UsersModule,
        StatisticsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
