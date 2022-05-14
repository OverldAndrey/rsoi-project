import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import {TransactionsService} from "./transactions.service";
import {StatisticsService} from "../../statistics/statistics/statistics.service";
import {ConfigModule} from "@nestjs/config";

class MockTransactionsService {

}

class MockStatisticsService {

}

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useClass: MockTransactionsService,
        },
        {
          provide: StatisticsService,
          useClass: MockStatisticsService,
        }
      ]
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
