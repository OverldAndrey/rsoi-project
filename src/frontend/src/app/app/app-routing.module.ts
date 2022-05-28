import { AdminComponent } from '../admin/components/admin/admin.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthPageComponent } from '../auth/components/auth-page/auth-page.component';
import { GameDetailedComponent } from '../games/components/game-detailed/game-detailed.component';
import { GamesPageComponent } from '../games/components/games-page/games-page.component';
import { NgModule } from '@angular/core';
import { NotAuthGuard } from '../auth/guards/not-auth.guard';
import { RegisterPageComponent } from '../auth/components/register-page/register-page.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { RouteData } from '../core/models/route-data';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from '../user/components/user-info/user-info.component';

const routes: Routes = [
    {
        path: 'auth/login',
        canActivate: [NotAuthGuard],
        component: AuthPageComponent,
        data: {} as RouteData,
    },
    {
        path: 'auth/register',
        canActivate: [NotAuthGuard],
        component: RegisterPageComponent,
        data: {} as RouteData,
    },
    {
        path: 'auth',
        pathMatch: 'full',
        redirectTo: 'auth/login',
        data: {} as RouteData,
    },
    {
        path: 'games/:id',
        component: GameDetailedComponent,
        data: {} as RouteData,
    },
    {
        path: 'games',
        component: GamesPageComponent,
        data: {} as RouteData,
    },
    {
        path: 'me',
        canActivate: [AuthGuard, RoleGuard],
        component: UserInfoComponent,
        data: {
            role: 'User',
        } as RouteData,
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        component: AdminComponent,
        data: {
            role: 'Admin',
        } as RouteData,
    },
    {
        path: 'not-found',
        component: GamesPageComponent, // TODO: Replace with 404 page
        data: {} as RouteData,
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
