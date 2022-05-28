import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserBalanceDialogComponent } from './components/user-balance-dialog/user-balance-dialog.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import {MaterialProxyModule} from "../material-proxy/material-proxy.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {GamesModule} from "../games/games.module";



@NgModule({
  declarations: [
    UserInfoComponent,
    UserBalanceDialogComponent,
    UserLibraryComponent
  ],
    imports: [
        CommonModule,
        MaterialProxyModule,
        ReactiveFormsModule,
        RouterModule,
        GamesModule
    ]
})
export class UserModule { }
