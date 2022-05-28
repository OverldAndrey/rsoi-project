import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import {ConfigModule} from "@nestjs/config";
import {UsersService} from "../../users/users/users.service";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {GamesService} from "./games.service";
import {TransactionsService} from "../../users/transactions/transactions.service";

class MockUsersService {

}

class MockStatisticsService {

}

class MockGamesService {

}

class MockTransactionsService {

}

describe('GamesController', () => {
    let controller: GamesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            controllers: [GamesController],
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

        controller = module.get<GamesController>(GamesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
