import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import {AdminApiService} from "./admin-api.service";
import {ServiceType, Statistic} from "../../core/models/statistic";
import {of} from "rxjs";

class MockAdminApiService {
    public getStatistics(
        service: ServiceType,
        dateFrom?: string,
        dateTo?: string,
    ) { return of(); }
}

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: AdminApiService,
                useClass: MockAdminApiService,
            }
        ]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
