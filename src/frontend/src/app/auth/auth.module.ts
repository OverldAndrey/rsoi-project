import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        AuthPageComponent,
        RegisterPageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialProxyModule,
    ],
})
export class AuthModule { }
