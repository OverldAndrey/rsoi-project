import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction';
import {StatisticsModule} from "../statistics/statistics.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), StatisticsModule, ConfigModule],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
