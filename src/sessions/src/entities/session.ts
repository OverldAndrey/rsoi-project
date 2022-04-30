import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity({ database: 'sessions' })
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column({ type: 'varchar', length: 256, nullable: false })
    token: string;

    @Column({ type: 'timestamp with time zone', nullable: false })
    createDate: Date;
}
