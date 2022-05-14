import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {ConfigModule} from "@nestjs/config";
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users/users.service";
import {StatisticsService} from "../../statistics/statistics/statistics.service";

class MockUsersService {

}

class MockStatisticsService {

}

class MockAuthService {

}

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            controllers: [AuthController],
            providers:[
                {
                    provide: AuthService,
                    useClass: MockAuthService,
                },
                {
                    provide: UsersService,
                    useClass: MockUsersService,
                },
                {
                    provide: StatisticsService,
                    useClass: MockStatisticsService,
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
