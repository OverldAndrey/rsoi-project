import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../entities/transaction';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
    ) {}

    public async getAll(userId: number) {
        return this.transactionsRepository.find({ where: { userId } });
    }

    public async addOne(transaction: Partial<Transaction>) {
        return this.transactionsRepository.save(transaction);
    }

    public async deleteOne(id: number) {
        return this.transactionsRepository.delete({ id });
    }
}
