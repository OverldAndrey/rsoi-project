import { BehaviorSubject, distinctUntilChanged, firstValueFrom, Observable, switchMap } from 'rxjs';
import { Game } from '../../core/models/game';
import { GamesApiService } from './games-api.service';
import { Injectable } from '@angular/core';
import { shareReplayOneRefCount } from '../../core/utils/share-replay-one-ref';

@Injectable({
    providedIn: 'root',
})
export class GamesService {

    private readonly PAGE_SIZE = 20;

    private readonly gamesSubject = new BehaviorSubject<Game[]>([]);

    private readonly pageSubject = new BehaviorSubject(0);

    public readonly gamesObservable: Observable<Game[]> = this.pageSubject.pipe(
        distinctUntilChanged(),
        switchMap(page => this.gamesApi.getAllGames(page, this.PAGE_SIZE)),
        switchMap(newGames => {
            if (newGames.length === 0) {
                this.loadedAll = true;
            }

            const games = [...this.gamesSubject.value, ...newGames];

            this.gamesSubject.next(games);

            return this.gamesSubject;
        }),
        shareReplayOneRefCount(),
    );

    private loadedAll = false;

    constructor(
        private readonly gamesApi: GamesApiService,
    ) {
        this.gamesObservable.subscribe();
    }

    public loadMoreGames() {
        if (this.loadedAll) {
            return;
        }

        let page = this.pageSubject.value;

        this.pageSubject.next(++page);
    }

    public async getGameInfo(id: number) {
        return firstValueFrom(this.gamesApi.getGame(id));
    }

    public async buyGame(id: number) {
        await firstValueFrom(this.gamesApi.buyGame(id));
    }

}
