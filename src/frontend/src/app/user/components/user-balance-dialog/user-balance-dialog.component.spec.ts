import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBalanceDialogComponent } from './user-balance-dialog.component';

describe('UserBalanceDialogComponent', () => {
  let component: UserBalanceDialogComponent;
  let fixture: ComponentFixture<UserBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBalanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
