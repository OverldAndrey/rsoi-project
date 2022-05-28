import { TestBed } from '@angular/core/testing';

import { UsersApiService } from './users-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UsersApiService', () => {
  let service: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
