import { AdminApiService } from './admin-api.service';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceType } from '../../core/models/statistic';

@Injectable({
    providedIn: 'root',
})
export class AdminService {

    constructor(
        private readonly adminApi: AdminApiService,
    ) { }

    public async getStatistics(
        service: ServiceType,
        dateFrom?: Date,
        dateTo?: Date,
    ) {
        return firstValueFrom(this.adminApi.getStatistics(service, dateFrom?.toISOString(), dateTo?.toISOString()));
    }

}
