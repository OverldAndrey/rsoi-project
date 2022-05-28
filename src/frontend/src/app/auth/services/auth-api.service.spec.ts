import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
