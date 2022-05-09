import { AdminService } from '../../services/admin.service';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultTrackBy } from '../../../core/utils/default-track-by';
import { FormBuilder } from '@angular/forms';
import { ServiceType, serviceTypes, Statistic } from '../../../core/models/statistic';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

    public readonly columns = ['service', 'description', 'timestamp'];

    public readonly services = serviceTypes;

    public readonly trackBy = defaultTrackBy;

    public readonly statsFilterForm = this.fb.group({
        services: [],
        dateFrom: null,
        dateTo: null,
    });

    public readonly statsSubject = new BehaviorSubject<Statistic[]>([]);

    constructor(
        public readonly admin: AdminService,
        private readonly fb: FormBuilder,
        private readonly auth: AuthService,
        private readonly router: Router,
    ) { }

    public async getStats() {
        const { services, dateFrom, dateTo }
            = this.statsFilterForm.value as { services: ServiceType[]; dateFrom: Date | null; dateTo: Date | null };

        const stats: Statistic[] = (await Promise.all(services.map(service => this.admin
            // eslint-disable-next-line no-undefined
            .getStatistics(service, dateFrom ?? undefined, dateTo ?? undefined)))).flat();

        this.statsSubject.next(stats);
    }

    public async logout() {
        await this.auth.logout();
        await this.router.navigateByUrl('/auth/login');
    }

}
