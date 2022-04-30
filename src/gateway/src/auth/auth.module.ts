import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [HttpModule, ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
