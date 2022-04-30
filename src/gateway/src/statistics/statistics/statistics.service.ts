import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {Statistic} from "../../models/statistic";
import {map} from "rxjs";

@Injectable()
export class StatisticsService {
    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {}

    public getStatistics(service: string, dateFrom?: string, dateTo?: string) {
        let url = `/statistics?service=${service}`;

        if (dateFrom) {
            url += `&dateFrom=${dateFrom}`;
        }

        if (dateTo) {
            url += `&dateTo=${dateTo}`;
        }

        return this.http.get<Statistic[]>(this.config.get('statisticsAddress') + url).pipe(
            map(res => res.data),
        );
    }

    public addStatistic(stat: Partial<Statistic>) {
        const url = '/statistics';

        return this.http.post<{}>(this.config.get('statisticsAddress') + url).pipe(
            map(res => res.data),
        );
    }
}
