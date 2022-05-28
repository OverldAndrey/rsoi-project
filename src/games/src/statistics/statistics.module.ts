import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics/statistics.service';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
