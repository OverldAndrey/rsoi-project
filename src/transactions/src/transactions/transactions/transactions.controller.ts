import {Body, Controller, Delete, Get, Headers, Param, Post, Res} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../../entities/transaction';
import { Response } from 'express';
import {ConfigService} from "@nestjs/config";
import {StatisticsService} from "../../statistics/statistics/statistics.service";

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactions: TransactionsService,
        private readonly config: ConfigService,
        private readonly statistics: StatisticsService,
    ) {}

    @Get('')
    public async getTransactions(@Headers('X-User-Id') userId: number) {
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Get all transactions for user with id ${userId}`,
            timestamp: new Date().toISOString()
        });

        return this.transactions.getAll(userId);
    }

    @Post('')
    public async addTransaction(
        @Headers('X-User-Id') userId: number,
        @Body() body: Partial<Transaction>,
        @Res() res: Response,
    ) {
        console.log(body);

        if (!userId || (!body.sum && body.sum !== 0)) {
            this.statistics.addStatistic({
                service: this.config.get('serviceName'),
                description: `Error 400: No user id or sum is provided in request`,
                timestamp: new Date().toISOString()
            });

            return res.sendStatus(400);
        }

        const newTransaction = await this.transactions.addOne({ ...body, userId } as Partial<Transaction>);

        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `New transaction of type ${newTransaction.type} with id ${newTransaction.id} is created`,
            timestamp: new Date().toISOString()
        });

        return res.status(200).send(newTransaction);
    }

    @Delete(':id')
    public async removeTransaction(@Param('id') id: string, @Res() res: Response) {
        this.statistics.addStatistic({
            service: this.config.get('serviceName'),
            description: `Delete transaction with id ${id}`,
            timestamp: new Date().toISOString()
        });

        await this.transactions.deleteOne(Number(id));

        return res.status(200).send({});
    }
}
