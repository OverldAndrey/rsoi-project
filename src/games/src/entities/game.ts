import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'games' })
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    developer: string;

    @Column({ type: 'varchar', length: 64, nullable: false })
    publisher: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'varchar', length: 4096, nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 2048, nullable: false })
    requirements: string;
}
