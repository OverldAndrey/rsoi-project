import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {TransactionType, transactionTypes} from "../models/transaction-type";

@Entity({ database: 'transactions' })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @Column({ type: 'int', nullable: true })
    gameId: number | null;

    @Column({ type: 'enum', enum: transactionTypes, nullable: false })
    type: TransactionType;

    @Column({ type: 'float', nullable: false })
    sum: number;
}
