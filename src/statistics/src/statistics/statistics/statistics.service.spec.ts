import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Statistic} from "../../entities/statistic";

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsService,
        {
          provide: getRepositoryToken(Statistic),
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
