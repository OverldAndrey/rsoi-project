import { CommonModule } from '@angular/common';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDetailedComponent } from './components/game-detailed/game-detailed.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MaterialProxyModule} from "../material-proxy/material-proxy.module";
import { TruncatePipe } from './pipes/truncate.pipe';
import { PricePipe } from './pipes/price.pipe';
import { GamesToolbarComponent } from './components/games-toolbar/games-toolbar.component';



@NgModule({
    declarations: [
        GamesPageComponent,
        GameDetailedComponent,
        GameListComponent,
        GameCardComponent,
        TruncatePipe,
        PricePipe,
        GamesToolbarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialProxyModule,
    ],
    exports: [
        GameCardComponent
    ]
})
export class GamesModule { }
