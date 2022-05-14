import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AuthApiService} from "./auth-api.service";
import {UserLogin} from "../../core/models/user-login";
import {Session} from "../../core/models/session";
import {UserRegister} from "../../core/models/user-register";
import {of} from "rxjs";

class MockAuthApiService {
    public login(login: UserLogin) { return of(); }

    public logout() { return of(); }

    public register(user: UserRegister) { return of(); }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: AuthApiService,
                useClass: MockAuthApiService
            }
        ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
