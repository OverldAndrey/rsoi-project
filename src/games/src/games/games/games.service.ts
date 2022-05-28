import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../../entities/game';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game) private gamesRepository: Repository<Game>,
    ) {}

    getAll(page?: number, size?: number) {
        const pageSize = page ? size || 1 : undefined;

        let query = this.gamesRepository.createQueryBuilder('g');

        // return query.getMany();
        if (pageSize || size) {
            query = query.take(pageSize || size);
        }

        console.log(query.getQuery());

        return query.skip(page ? (page) * pageSize : 0).getMany();
    }

    getOneById(id: number) {
        return this.gamesRepository.findOneBy({ id });
    }
}
