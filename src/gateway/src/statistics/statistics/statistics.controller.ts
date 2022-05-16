import {BadRequestException, Controller, Get, Query, Req, Res, UseGuards} from '@nestjs/common';
import {StatisticsService} from "./statistics.service";
import {firstValueFrom} from "rxjs";
import {AuthGuard} from "@nestjs/passport";
import {Request, Response} from "express";
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../models/role.enum";
import {ConfigService} from "@nestjs/config";
import {RolesGuard} from "../../auth/guards/roles.guard";

@Controller('')
export class StatisticsController {
    constructor(
        private readonly statistics: StatisticsService,
        private readonly config: ConfigService,
    ) {}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard('custom'), RolesGuard)
    @Get('')
    public async getStatistics(
        @Query('service') service: string,
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if (!service) {
            this.statistics.addStatistic({
                description: `Error 400: Service not provided for statistics request`,
                service: this.config.get('serviceName'),
                timestamp: new Date().toISOString(),
            });

            return res.status(400).send(new BadRequestException());
        }

        this.statistics.addStatistic({
            description: `Get statistics for ${service} by date range from ${dateFrom} to ${dateTo}`,
            service: this.config.get('serviceName'),
            timestamp: new Date().toISOString(),
        });

        return res.status(200).send(firstValueFrom(this.statistics.getStatistics(service, dateFrom, dateTo)));
    }
}
