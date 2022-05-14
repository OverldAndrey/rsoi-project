import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import {ConfigModule} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {of} from "rxjs";

class MockHttpService {
  public get<T>() {
    return of({});
  }

  public post<T>() {
    return of({});
  }
}

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [{
        provide: HttpService,
        useClass: MockHttpService,
      }, StatisticsService],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
