import { TestBed } from '@angular/core/testing';

import { AdminApiService } from './admin-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminApiService', () => {
  let service: AdminApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AdminApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
