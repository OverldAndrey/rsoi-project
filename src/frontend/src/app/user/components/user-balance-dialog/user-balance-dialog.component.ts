import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-balance-dialog',
    templateUrl: './user-balance-dialog.component.html',
    styleUrls: ['./user-balance-dialog.component.scss'],
})
export class UserBalanceDialogComponent implements OnInit {

    public balance = NaN;

    public fillBalanceControl = this.fb.control(0);

    constructor(
        private readonly users: UsersService,
        private readonly cd: ChangeDetectorRef,
        private readonly fb: FormBuilder,
        public readonly dialogRef: MatDialogRef<UserBalanceDialogComponent>,
        // eslint-disable-next-line @typescript-eslint/no-parameter-properties
        @Inject(MAT_DIALOG_DATA) public userId: number,
    ) { }

    public ngOnInit(): void {
        // eslint-disable-next-line no-void
        void this.users.getCurrentUserBalance().then(balance => {
            this.balance = balance.amount;
            this.cd.detectChanges();
        });
    }

    public async fillBalance() {
        const newBalance = await this.users.fillBalance(this.fillBalanceControl.value as number);

        this.balance = newBalance.amount;
        this.cd.detectChanges();
    }

}
