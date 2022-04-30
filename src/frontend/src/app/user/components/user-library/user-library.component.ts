import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { defaultTrackBy } from '../../../core/utils/default-track-by';
import { Game } from '../../../core/models/game';
import { UsersService } from '../../services/users.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user-library',
    templateUrl: './user-library.component.html',
    styleUrls: ['./user-library.component.scss'],
})
export class UserLibraryComponent implements OnInit {

    public games: Game[] = [];

    public trackBy = defaultTrackBy;

    constructor(
        private readonly users: UsersService,
        private readonly cd: ChangeDetectorRef,
    ) { }

    public ngOnInit(): void {
        // eslint-disable-next-line no-void
        void this.users.getLibrary().then(games => {
            this.games = games;
            this.cd.detectChanges();
        });
    }

}
