import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Session} from "../../entities/session";
import {Repository} from "typeorm";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: getRepositoryToken(Session),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
