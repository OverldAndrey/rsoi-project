import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceType, Statistic } from '../../core/models/statistic';

@Injectable({
    providedIn: 'root',
})
export class AdminApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public getStatistics(
        service: ServiceType,
        dateFrom?: string,
        dateTo?: string,
    ) {
        let url = `/api/statistics?service=${service}`;

        if (dateFrom) {
            url += `&dateFrom=${dateFrom}`;
        }

        if (dateTo) {
            url += `&dateTo=${dateTo}`;
        }

        return this.http.get<Statistic[]>(url);
    }

}
