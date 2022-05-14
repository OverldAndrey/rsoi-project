import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {HttpService} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

class MockHttpService {

}

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                UsersService,
                {
                    provide: HttpService,
                    useClass: MockHttpService
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
