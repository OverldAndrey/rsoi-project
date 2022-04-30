import { AuthService } from '../services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Sets 'Authorization' header on all requests and adds handler for 'unauthorized' and 'forbidden' responses
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private readonly UNAUTHORIZED_PATTERNS = [
        /^\/?games/,
        '/auth/login',
        '/auth/register',
    ];

    public constructor(private readonly auth: AuthService, private readonly router: Router) {}

    // eslint-disable-next-line max-lines-per-function
    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.UNAUTHORIZED_PATTERNS.some(pattern => {
            if (typeof pattern === 'string') {
                return request.url === pattern;
            }

            return pattern.test(request.url);
        })) {
            return next.handle(request);
        }

        const accessToken = this.auth.session?.token;
        let updatedRequest = request.clone();

        if (accessToken) {
            updatedRequest = updatedRequest.clone({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                setHeaders: { Authorization: `${accessToken}` }, // TODO: `Bearer ${accessToken}`
            });
        }

        return next.handle(updatedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
                    this.router.navigate(['auth']).catch(err => {
                        // eslint-disable-next-line no-console
                        console.error(err);
                    });
                }
                return throwError(() => new Error(error.message));
            }),
        );
    }

}
