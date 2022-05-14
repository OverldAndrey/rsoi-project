import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import {GamesService} from "./games.service";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigModule} from "@nestjs/config";

class MockGamesService {

}

class MockStatisticsService {

}

describe('GamesController', () => {
  let controller: GamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useClass: MockGamesService
        },
        {
          provide: StatisticsService,
          useClass: MockStatisticsService
        }
      ]
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
