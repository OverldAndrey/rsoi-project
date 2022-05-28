import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Game } from '../../../core/models/game';
import { GamesService } from '../../services/games.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

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
        private readonly snackbar: MatSnackBar,
    ) { }

    public ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.route.params.subscribe(async params => {
            this.game = await this.games.getGameInfo(Number(params['id']));
            this.cd.detectChanges();
        });
    }

    // eslint-disable-next-line max-statements
    public async buy() {
        if (!this.game) {
            return;
        }

        try {
            await this.games.buyGame(this.game.id);
        } catch (err: unknown) {
            const message = (err as Error).message;
            if (message.includes('409 Conflict')) {
                this.snackbar.open('Ошибка: Игра уже в библиотеке', 'Закрыть', { duration: 5000 });
            } else if (message.includes('422 Unprocessable Entity')) {
                this.snackbar.open('Ошибка: Недостаточно средств', 'Закрыть', { duration: 5000 });
            } else {
                this.snackbar.open('Ошибка: Не получилось обработать запрос', 'Закрыть', { duration: 5000 });
            }
            throw err;
        }

        this.snackbar.open('Покупка совершена! Игра добавлена в библиотеку', 'Закрыть', { duration: 5000 });
    }

}
