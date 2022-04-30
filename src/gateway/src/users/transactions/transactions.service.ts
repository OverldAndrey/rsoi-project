import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Transaction} from "../../models/transaction";
import {ConfigService} from "@nestjs/config";
import {map} from "rxjs";

@Injectable()
export class TransactionsService {
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
        return this.http
            .get(this.config.get('transactionsAddress') + url, { headers: { 'X-User-Id': userId } })
            .pipe(
                map(res => res.data as Transaction[]),
            );
    }
}
