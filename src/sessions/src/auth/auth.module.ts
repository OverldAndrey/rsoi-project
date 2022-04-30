import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../entities/session';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from "../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Session]), UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
