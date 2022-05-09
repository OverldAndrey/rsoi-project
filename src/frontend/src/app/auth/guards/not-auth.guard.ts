import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {}

    public canActivate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        route: ActivatedRouteSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state: RouterStateSnapshot,
    ): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
        return this.auth.sessionObservable.pipe(
            map(session => session ? this.router.parseUrl('/games') : true),
        );
    }

}
