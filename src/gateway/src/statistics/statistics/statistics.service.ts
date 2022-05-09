import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {Statistic} from "../../models/statistic";
import {firstValueFrom, from, map, queueScheduler} from "rxjs";
import * as circuitBreaker from '@bennadel/circuit-breaker';
import {Game} from "../../models/game";

@Injectable()
export class StatisticsService {
    private readonly queue = queueScheduler;

    private readonly getStatisticsCircuitBreaker =
        circuitBreaker.CircuitBreakerFactory.create({
            id: 'get statistics',
            requestTimeout: 5000,
            volumeThreshold: 10,
            failureThreshold: 100, // Percent (as in 1 failure in 10 responses trips the circuit).
            activeThreshold: 50,
            isFailure: function (error) {
                return error.status === 'ECONNRESET';
            },
            fallback: [],
            monitor: function (eventType, eventData) {
                console.log(eventType, eventData);
            },
            bucketCount: 40,
            bucketDuration: 100,
        });

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

        return from<Statistic[][]>(this.getStatisticsCircuitBreaker.execute(() => {
            return firstValueFrom(this.http.get<Statistic[]>(this.config.get('statisticsAddress') + url).pipe(
                map(res => res.data),
            ));
        }));
    }

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
