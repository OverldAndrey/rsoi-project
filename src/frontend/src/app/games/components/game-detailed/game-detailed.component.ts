import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Game } from '../../../core/models/game';
import { GamesService } from '../../services/games.service';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-game-detailed',
    templateUrl: './game-detailed.component.html',
    styleUrls: ['./game-detailed.component.scss'],
})
export class GameDetailedComponent implements OnInit {

    public game?: Game;

    constructor(
        private readonly games: GamesService,
        private readonly route: ActivatedRoute,
        public readonly auth: AuthService,
        private readonly cd: ChangeDetectorRef,
    ) { }

    public ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.route.params.subscribe(async params => {
            this.game = await this.games.getGameInfo(Number(params['id']));
            this.cd.detectChanges();
        });
    }

    public async buy() {
        if (!this.game) {
            return;
        }

        await this.games.buyGame(this.game.id);
    }
}
