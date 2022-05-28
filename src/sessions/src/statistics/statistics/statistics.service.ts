import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {Statistic} from "../../models/statistic";
import {firstValueFrom, map, queueScheduler} from "rxjs";

@Injectable()
export class StatisticsService {
    private readonly queue = queueScheduler;

    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {}

    public addStatistic(stat: Partial<Statistic>) {
        const task = async () => {
            try {
                await firstValueFrom(this.addStatisticRaw(stat));
            } catch (e) {
                this.queue.schedule(task, 1000);
            }
        }
        this.queue.schedule(task, 1000);
    }

    private addStatisticRaw(stat: Partial<Statistic>) {
        const url = '/statistics';

        return this.http.post<{}>(this.config.get('statisticsAddress') + url, stat).pipe(
            map(res => res.data),
        );
    }
}
