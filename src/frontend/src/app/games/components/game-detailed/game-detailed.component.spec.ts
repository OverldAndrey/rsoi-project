import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailedComponent } from './game-detailed.component';

describe('GameDetailedComponent', () => {
  let component: GameDetailedComponent;
  let fixture: ComponentFixture<GameDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
