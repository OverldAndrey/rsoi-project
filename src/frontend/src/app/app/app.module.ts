import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ApiOriginInterceptor } from '../core/interceptors/api-origin.interceptor';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesModule } from '../games/games.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../auth/interceptors/jwt.interceptor';
import { UserModule } from '../user/user.module';
import {AdminModule} from "../admin/admin.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        GamesModule,
        AuthModule,
        UserModule,
        AdminModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiOriginInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
