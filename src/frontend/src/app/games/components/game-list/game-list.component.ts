import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { defaultTrackBy } from '../../../core/utils/default-track-by';
import { GamesService } from '../../services/games.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {

    public trackBy = defaultTrackBy;

    @ViewChild('scrollContainer')
    public scrollContainer?: ElementRef<HTMLDivElement>;

    private scrollEnded = false;

    constructor(
        public readonly games: GamesService,
    ) { }

    public detectScrollEnd() {
        if (!this.scrollContainer) {
            return;
        }

        const scrollElement = this.scrollContainer.nativeElement;

        const scrollHeightReached = scrollElement.offsetHeight + scrollElement.scrollTop >= scrollElement.scrollHeight;

        if (scrollHeightReached && !this.scrollEnded) {
            this.scrollEnded = true;

            this.games.loadMoreGames();
        } else if (!scrollHeightReached && this.scrollEnded) {
            this.scrollEnded = false;
        }
    }

}
