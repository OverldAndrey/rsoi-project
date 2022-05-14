import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import {HttpService} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

class MockHttpService {

}

describe('TransactionsService', () => {
    let service: TransactionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                TransactionsService,
                {
                    provide: HttpService,
                    useClass: MockHttpService
                }
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
