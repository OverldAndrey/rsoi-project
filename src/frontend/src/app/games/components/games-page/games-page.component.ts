import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
    selector: 'app-games-page',
    templateUrl: './games-page.component.html',
    styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {

    constructor(
        public readonly games: GamesService,
    ) { }

    ngOnInit(): void {
    }

}
