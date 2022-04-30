import {forwardRef, Module} from '@nestjs/common';
import { TransactionsService } from './transactions/transactions.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { GamesModule } from "../games/games.module";

@Module({
  imports: [HttpModule, ConfigModule, forwardRef(() => GamesModule)],
  providers: [TransactionsService, UsersService],
  controllers: [UsersController],
  exports: [TransactionsService, UsersService],
})
export class UsersModule {}
