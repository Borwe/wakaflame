import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDisplayComponent } from './languages-display.component';

describe('LanguagesDisplayComponent', () => {
  let component: LanguagesDisplayComponent;
  let fixture: ComponentFixture<LanguagesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
