import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {UsersApiService} from "./users-api.service";
import {UserBalance} from "../../core/models/user-balance";
import {of} from "rxjs";

class MockUsersApiService {
    public getUserInfo() { return of(); }

    public getUserBalance() { return of(); }

    public fillUserBalance(balanceDiff: UserBalance) { return of(); }

    public getUserLibrary() { return of(); }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: UsersApiService,
                useClass: MockUsersApiService
            }
        ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
