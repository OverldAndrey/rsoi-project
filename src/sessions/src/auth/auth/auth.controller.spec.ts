import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UsersService} from "../../users/users/users.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {StatisticsService} from "../../statistics/statistics/statistics.service";

class MockAuthService {

}

class MockUsersService {

}

class MockStatisticsService {

}

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('jwtSecret'),
          }),
          inject: [ConfigService]
        })
      ],
      controllers: [AuthController],
      providers: [
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
