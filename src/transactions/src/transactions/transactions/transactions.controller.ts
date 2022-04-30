import { Body, Controller, Get, Headers, Post, Res } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../../entities/transaction';
import { Response } from 'express';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactions: TransactionsService) {}

    @Get('')
    public async getTransactions(@Headers('X-User-Id') userId: number) {
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
            return res.sendStatus(400);
        }

        const newTransaction = await this.transactions.addOne({ ...body, userId } as Partial<Transaction>);

        return res.status(200).send(newTransaction);
    }
}
