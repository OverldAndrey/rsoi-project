import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import {HttpService} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

class MockHttpService {

}

describe('GamesService', () => {
    let service: GamesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                GamesService,
                {
                    provide: HttpService,
                    useClass: MockHttpService
                }
            ],
        }).compile();

        service = module.get<GamesService>(GamesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
