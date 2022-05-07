import {Controller, Get, Query, Req, UseGuards} from '@nestjs/common';
import {StatisticsService} from "./statistics.service";
import {firstValueFrom} from "rxjs";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../models/role.enum";

@Controller('')
export class StatisticsController {
    constructor(
        private readonly statistics: StatisticsService,
    ) {}

    @UseGuards(AuthGuard('custom'))
    @Roles(Role.Admin)
    @Get('')
    public async getStatistics(
        @Query('service') service: string,
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
        @Req() req: Request,
    ) {
        await firstValueFrom(this.statistics.addStatistic({
            description: `Get statistics for ${service} by date range from ${dateFrom} to ${dateTo}`,
            service: 'statistics',
        }));

        return firstValueFrom(this.statistics.getStatistics(service, dateFrom, dateTo));
    }
}
