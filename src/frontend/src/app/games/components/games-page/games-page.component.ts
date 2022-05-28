import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-games-page',
    templateUrl: './games-page.component.html',
    styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent {

    constructor(
        public readonly games: GamesService,
    ) { }

}
