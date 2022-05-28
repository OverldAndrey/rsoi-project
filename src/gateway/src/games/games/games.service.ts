import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import {firstValueFrom, from, map, of} from "rxjs";
import { Game } from "../../models/game";
import * as circuitBreaker from '@bennadel/circuit-breaker';

@Injectable()
export class GamesService {
    private readonly getGamesCircuitBreaker =
        circuitBreaker.CircuitBreakerFactory.create({
            id: 'get games',
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

    private readonly getGameByIdCircuitBreaker =
        circuitBreaker.CircuitBreakerFactory.create({
            id: 'get game by id',
            requestTimeout: 5000,
            volumeThreshold: 10,
            failureThreshold: 100, // Percent (as in 1 failure in 10 responses trips the circuit).
            activeThreshold: 50,
            isFailure: function (error) {
                return error.status === 'ECONNRESET';
            },
            fallback: {
                id: 0,
                price: 0,
                requirements: 'N/A',
                description: 'N/A',
                publisher: 'N/A',
                developer: 'N/A',
                name: 'N/A',
            } as Game,
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

    public getAllGames(page: number, size: number) {
        const url = `/games?page=${page}&size=${size}`;

        return from<Game[][]>(this.getGamesCircuitBreaker.execute(() => {
            return firstValueFrom(this.http.get(this.config.get('gamesAddress') + url).pipe(
                map(res => res.data as Game[]),
            ));
        }));
    }

    public getGameById(id: number) {
        const url = `/games/${id}`;

        return from<Game[]>(this.getGameByIdCircuitBreaker.execute(() => {
            return firstValueFrom(this.http.get(this.config.get('gamesAddress') + url).pipe(
                map(res => res.data as Game),
            ));
        }));
    }
}
