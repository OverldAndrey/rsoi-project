import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Session} from "../../entities/session";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Session) private readonly sessionsRepository: Repository<Session>,
    ) {}

    public createOrUpdateSession(session: Partial<Session>) {
        return this.sessionsRepository.save(session);
    }

    public async deleteSession(sessionId: number) {
        return this.sessionsRepository.delete(sessionId);
    }
}
