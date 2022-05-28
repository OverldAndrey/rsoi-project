import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RouteData } from '../../core/models/route-data';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
        const routeRole = (route.data as RouteData).role;
        return this.auth.roleObservable.pipe(
            map(role => role === routeRole ? true : this.router.parseUrl('/games')),
        );
    }

}
