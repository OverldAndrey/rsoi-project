import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Transaction} from "../../models/transaction";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom, from, map, queueScheduler} from "rxjs";
import * as circuitBreaker from '@bennadel/circuit-breaker';
import {Game} from "../../models/game";

@Injectable()
export class TransactionsService {
    private readonly queue = queueScheduler;

    private readonly getTransactionsCircuitBreaker =
        circuitBreaker.CircuitBreakerFactory.create({
            id: 'get transactions',
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

    public addTransaction(transaction: Partial<Transaction>, userId: number) {
        const url = '/transactions';
        return this.http
            .post(
                this.config.get('transactionsAddress') + url,
                transaction,
                { headers: { 'X-User-Id': userId } }
            ).pipe(
                map(res => res.data as Transaction)
            );
    }

    public getUsersTransactions(userId: number) {
        const url = '/transactions';

        return from<Transaction[][]>(this.getTransactionsCircuitBreaker.execute(() => {
            return firstValueFrom(this.http
                .get(this.config.get('transactionsAddress') + url, { headers: { 'X-User-Id': userId } })
                .pipe(
                    map(res => res.data as Transaction[]),
                ));
        }));
    }

    public cancelTransaction(transactionId: number) {
        const task = async () => {
            try {
                await firstValueFrom(this.cancelTransactionRaw(transactionId));
            } catch (e) {
                this.queue.schedule(task, 1000);
            }
        }
        this.queue.schedule(task, 1000);
    }

    private cancelTransactionRaw(transactionId: number) {
        const url = `/transactions/${transactionId}`;

        return this.http.delete(this.config.get('transactionsAddress') + url).pipe(
            map(res => res.data),
        );
    }
}
