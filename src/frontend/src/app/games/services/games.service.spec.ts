import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import {GamesApiService} from "./games-api.service";
import {of} from "rxjs";

class MockGamesApiService {
    public getAllGames(page: number, size: number) { return of(); }

    public getGame(id: number) { return of(); }

    public buyGame(id: number) { return of(); }
}

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            {
                provide: GamesApiService,
                useClass: MockGamesApiService
            }
        ]
    });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
