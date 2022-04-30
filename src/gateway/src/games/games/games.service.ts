import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { map } from "rxjs";
import { Game } from "../../models/game";

@Injectable()
export class GamesService {
    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {}

    public getAllGames(page: number, size: number) {
        const url = `/games?page=${page}&size=${size}`;
        return this.http.get(this.config.get('gamesAddress') + url).pipe(
            map(res => res.data as Game[]),
        );
    }

    public getGameById(id: number) {
        const url = `/games/${id}`;
        return this.http.get(this.config.get('gamesAddress') + url).pipe(
            map(res => res.data as Game),
        );
    }
}
