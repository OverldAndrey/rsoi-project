import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsService } from './statistics/statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
