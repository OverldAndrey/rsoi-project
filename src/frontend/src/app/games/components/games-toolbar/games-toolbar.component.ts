import { AuthService } from '../../../auth/services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-games-toolbar',
    templateUrl: './games-toolbar.component.html',
    styleUrls: ['./games-toolbar.component.scss'],
})
export class GamesToolbarComponent {

    constructor(
        public readonly auth: AuthService,
    ) { }

}
