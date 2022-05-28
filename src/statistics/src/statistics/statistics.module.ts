import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsService } from './statistics/statistics.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Statistic } from "../entities/statistic";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Statistic]), ConfigModule],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: [StatisticsService]
})
export class StatisticsModule {}
