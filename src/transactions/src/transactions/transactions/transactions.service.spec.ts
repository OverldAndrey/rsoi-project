import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Transaction} from "../../entities/transaction";
import {Repository} from "typeorm";

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
