import { CommonModule } from '@angular/common';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDetailedComponent } from './components/game-detailed/game-detailed.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MaterialProxyModule} from "../material-proxy/material-proxy.module";



@NgModule({
    declarations: [
        GamesPageComponent,
        GameDetailedComponent,
        GameListComponent,
        GameCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialProxyModule,
    ],
})
export class GamesModule { }
