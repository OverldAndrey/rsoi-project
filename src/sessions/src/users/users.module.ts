import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import {StatisticsModule} from "../statistics/statistics.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([User]), StatisticsModule, ConfigModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
