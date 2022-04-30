import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../../core/models/user-login';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {

    public readonly authForm = this.fb.group({
        username: '',
        password: '',
    });

    constructor(
        public readonly fb: FormBuilder,
        public readonly auth: AuthService,
        public readonly router: Router,
    ) { }

    public async login() {
        await this.auth.login(this.authForm.value as UserLogin);

        await this.router.navigateByUrl('/games');
    }

}
