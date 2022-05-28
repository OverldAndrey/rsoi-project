import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../entities/session';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {StatisticsModule} from "../statistics/statistics.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Session]),
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret'),
            }),
            inject: [ConfigService]
        }),
        StatisticsModule,
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
