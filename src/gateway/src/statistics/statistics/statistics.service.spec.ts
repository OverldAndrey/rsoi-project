import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import {HttpService} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

class MockHttpService {

}

describe('StatisticsService', () => {
    let service: StatisticsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                StatisticsService,
                {
                    provide: HttpService,
                    useClass: MockHttpService
                }
            ],
        }).compile();

        service = module.get<StatisticsService>(StatisticsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
