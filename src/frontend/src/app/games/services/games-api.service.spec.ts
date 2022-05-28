import { TestBed } from '@angular/core/testing';

import { GamesApiService } from './games-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GamesApiService', () => {
  let service: GamesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GamesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
