import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {ConfigModule} from "@nestjs/config";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {GamesService} from "../../games/games/games.service";
import {TransactionsService} from "../transactions/transactions.service";
import {UsersService} from "./users.service";

class MockUsersService {

}

class MockStatisticsService {

}

class MockGamesService {

}

class MockTransactionsService {

}

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            controllers: [
                UsersController,
            ],
            providers: [
                {
                    provide: UsersService,
                    useClass: MockUsersService,
                },
                {
                    provide: StatisticsService,
                    useClass: MockStatisticsService,
                },
                {
                    provide: GamesService,
                    useClass: MockGamesService
                },
                {
                    provide: TransactionsService,
                    useClass: MockTransactionsService,
                }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
