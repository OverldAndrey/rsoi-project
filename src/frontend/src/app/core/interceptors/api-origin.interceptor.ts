import { environment } from '../../../environments/environment';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiOriginInterceptor implements HttpInterceptor {

    constructor() {}

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const url = /^\/?api/.test(request.url)
            ? `${environment.apiOrigin}${request.url}`
            : request.url;

        return next.handle(request.clone({
            url,
        }));
    }

}
