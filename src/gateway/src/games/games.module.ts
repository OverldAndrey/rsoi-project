import {forwardRef, Module} from '@nestjs/common';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [HttpModule, ConfigModule, forwardRef(() => UsersModule)],
    controllers: [GamesController],
    providers: [GamesService],
    exports: [GamesService],
})
export class GamesModule {}
