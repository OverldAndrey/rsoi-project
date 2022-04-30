import { AuthPageComponent } from '../auth/components/auth-page/auth-page.component';
import { GameDetailedComponent } from '../games/components/game-detailed/game-detailed.component';
import { GamesPageComponent } from '../games/components/games-page/games-page.component';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from '../auth/components/register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from '../user/components/user-info/user-info.component';

const routes: Routes = [
    {
        path: 'auth/login',
        component: AuthPageComponent,
    },
    {
        path: 'auth/register',
        component: RegisterPageComponent,
    },
    {
        path: 'auth',
        pathMatch: 'full',
        redirectTo: 'auth/login',
    },
    {
        path: 'games/:id',
        component: GameDetailedComponent,
    },
    {
        path: 'games',
        component: GamesPageComponent,
    },
    {
        path: 'me',
        component: UserInfoComponent,
    },
    {
        path: 'not-found',
        component: GamesPageComponent, // TODO: Replace with 404 page
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'games',
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
