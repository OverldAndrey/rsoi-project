import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../../../core/models/user-register';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {

    public registerGroup = this.fb.group({
        username: '',
        password: '',
        email: '',
    });

    constructor(
        public readonly fb: FormBuilder,
        public readonly auth: AuthService,
        public readonly router: Router,
    ) { }

    public async submit() {
        await this.auth.register(this.registerGroup.value as UserRegister);

        await this.router.navigateByUrl('/auth/login');
    }

}
