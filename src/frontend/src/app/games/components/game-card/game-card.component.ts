import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from '../../../core/models/game';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {

    @Input()
    public game!: Game;

    @Input()
    public displayPrice = true;

    constructor() { }

}
