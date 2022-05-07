import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from "../auth/auth.module";
import {StatisticsModule} from "../statistics/statistics.module";

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        StatisticsModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
    exports: [ConfigService],
})
export class AppModule {}
