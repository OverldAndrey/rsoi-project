import { Component, OnInit } from '@angular/core';
import { defaultTrackBy } from '../../../core/utils/default-track-by';
import { GamesService } from '../../services/games.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

    public trackBy = defaultTrackBy;

    constructor(
        public readonly games: GamesService,
    ) { }

    ngOnInit(): void {
    }

}
