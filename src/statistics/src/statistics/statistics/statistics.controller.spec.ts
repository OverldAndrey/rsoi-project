import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import {StatisticsService} from "./statistics.service";
import {ConfigModule} from "@nestjs/config";

class MockStatisticsService {

}

describe('StatisticsController', () => {
  let controller: StatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [StatisticsController],
      providers: [{
        provide: StatisticsService,
        useClass: MockStatisticsService,
      }]
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
