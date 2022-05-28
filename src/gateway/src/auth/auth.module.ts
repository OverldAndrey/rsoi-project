import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {CustomStrategy} from "./strategies/jwt.strategy";
import {StatisticsModule} from "../statistics/statistics.module";

@Module({
  imports: [HttpModule, ConfigModule, UsersModule, PassportModule, StatisticsModule],
  controllers: [AuthController],
  providers: [AuthService, CustomStrategy],
  exports: [AuthService],
})
export class AuthModule {}
