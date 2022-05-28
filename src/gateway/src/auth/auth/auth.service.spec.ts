import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {HttpService} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

class MockHttpService {

}

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                AuthService,
                {
                    provide: HttpService,
                    useClass: MockHttpService
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
