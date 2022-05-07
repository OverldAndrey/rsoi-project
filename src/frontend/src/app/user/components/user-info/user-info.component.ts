import { AuthService } from '../../../auth/services/auth.service';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { User } from '../../../core/models/user';
import { UsersService } from '../../services/users.service';
import {MatDialog} from "@angular/material/dialog";
import {UserBalanceDialogComponent} from "../user-balance-dialog/user-balance-dialog.component";
import {Router} from "@angular/router";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

    public user?: User;

    constructor(
        public readonly auth: AuthService,
        public readonly users: UsersService,
        private readonly cd: ChangeDetectorRef,
        private readonly dialog: MatDialog,
        private readonly router: Router,
    ) { }

    public ngOnInit() {
        // eslint-disable-next-line no-void
        void this.users.getCurrentUserInfo().then(userInfo => {
            this.user = userInfo;
            this.cd.detectChanges();
        });
    }

    public openBalanceDialog() {
        const dialogRef = this.dialog.open(UserBalanceDialogComponent, {
            data: this.user?.id,
        });
    }

    public async logout() {
        await this.auth.logout();
        await this.router.navigateByUrl('/games');
    }

}
