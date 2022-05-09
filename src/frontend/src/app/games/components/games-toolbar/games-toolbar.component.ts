import { AuthService } from '../../../auth/services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-games-toolbar',
    templateUrl: './games-toolbar.component.html',
    styleUrls: ['./games-toolbar.component.scss'],
})
export class GamesToolbarComponent {

    public readonly userRoute = this.auth.roleObservable.pipe(
        map(role => {
            if (role === 'User') {
                return ['/me'];
            } else if (role === 'Admin') {
                return ['/admin'];
            }

            return ['/games'];
        }),
    );

    constructor(
        public readonly auth: AuthService,
    ) { }

}
