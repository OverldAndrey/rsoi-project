import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'sessions' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 128, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    password: string;

    @Column({ type: 'float', nullable: false, default: 0 })
    balance: number;
}
