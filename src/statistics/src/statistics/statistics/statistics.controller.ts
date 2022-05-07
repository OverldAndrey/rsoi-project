import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistic } from '../../entities/statistic';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statistics: StatisticsService) {}

    @Get('')
    public async getStatistics(
        @Query('service') service: string,
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
    ) {
        return this.statistics.getStatistics(
            service,
            dateFrom ? new Date(dateFrom) : undefined,
            dateTo ? new Date(dateTo) : undefined,
        );
    }

    @Post('')
    public async addStatistic(@Body() stat: Partial<Statistic>) {
        console.log(stat);

        await this.statistics.addStatistic( { ...stat, timestamp: new Date() });

        return {};
    }
}
