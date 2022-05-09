import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRanksComponent } from './user-ranks.component';

describe('UserRanksComponent', () => {
  let component: UserRanksComponent;
  let fixture: ComponentFixture<UserRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
