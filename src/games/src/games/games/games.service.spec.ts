import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Game} from "../../entities/game";
import {Repository} from "typeorm";

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
