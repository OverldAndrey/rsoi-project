import {Controller, Get, Query} from '@nestjs/common';
import {StatisticsService} from "./statistics.service";
import {firstValueFrom} from "rxjs";

@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly statistics: StatisticsService,
    ) {}

    @Get('')
    public async getStatistics(
        @Query('service') service: string,
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
    ) {
        return firstValueFrom(this.statistics.getStatistics(service, dateFrom, dateTo));
    }
}
