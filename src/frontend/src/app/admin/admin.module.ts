import { AdminComponent } from './components/admin/admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [
        AdminComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialProxyModule,
    ],
})
export class AdminModule { }
