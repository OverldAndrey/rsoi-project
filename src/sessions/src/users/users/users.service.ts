import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async getById(userId: number) {
        // @ts-ignore
        return this.usersRepository.findOneBy({ id: userId });
    }

    public async getByUsername(username: string) {
        // @ts-ignore
        return this.usersRepository.findOneBy({ username });
    }

    public async addOrUpdateOne(user: Partial<User>) {
        return this.usersRepository.save(user);
    }
}