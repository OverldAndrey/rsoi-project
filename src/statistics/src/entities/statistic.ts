import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ database: 'statistics' })
export class Statistic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 32, nullable: false })
    service: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    description: string;

    @Column({ type: 'timestamp with time zone', nullable: false })
    timestamp: Date;
}
