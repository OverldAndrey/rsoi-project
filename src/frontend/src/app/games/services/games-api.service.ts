import { Game } from '../../core/models/game';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GamesApiService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public getAllGames(page: number, size: number) {
        const url = `/api/games?page=${page}&size=${size}`;

        return this.http.get<Game[]>(url);
    }

    public getGame(id: number) {
        const url = `/api/games/${id}`;

        return this.http.get<Game>(url);
    }

    public buyGame(id: number) {
        const url = `/api/games/${id}/buy`;

        return this.http.post<undefined>(url, {});
    }

}
