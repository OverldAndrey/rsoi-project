import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistic } from '../../entities/statistic';
import {ConfigService} from "@nestjs/config";

@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Get('')
    public async getStatistics(
        @Query('service') service: string,
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
    ) {
        await this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get statistics for service ${service} by dates from ${dateFrom} to ${dateTo}`,
            timestamp: new Date()
        });

        return this.statistics.getStatistics(
            service,
            dateFrom ? new Date(dateFrom) : undefined,
            dateTo ? new Date(dateTo) : undefined,
        );
    }

    @Post('')
    public async addStatistic(@Body() stat: Partial<Statistic>) {
        console.log(stat);

        await this.statistics.addStatistic( { ...stat });

        await this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Add statistic for service ${stat.service}`,
            timestamp: new Date()
        });

        return {};
    }
}
